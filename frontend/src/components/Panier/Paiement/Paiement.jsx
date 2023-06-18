import { useEffect, useState } from "react";
import mastercard from "../../../mastercard.svg"
import visa from "../../../visa.svg"
import "./Paiement.scss"
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
// import PaypalButton from "./PaypalButton";


const Paiement = () => {


    const [paypal, setPaypal] = useState(false)
    const [savedCard, setSavedCard] = useState(false)


    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");


    const [allData, setAllData] = useState([])
    const [cart, setCart] = useState([])
    const [isLoad, setIsLoad] = useState(false)
    const [emptyCart, setEmptyCart] = useState(true)


    let navigate = useNavigate();
    let userCart = []
    let currentCart = JSON.parse(sessionStorage.getItem("cart"));
    const [total, setTotal] = useState(0)


    const token = sessionStorage.getItem("token");
    const myDecodedToken = decodeToken(token);
    const userId = myDecodedToken.user_id

    const livraison = JSON.parse(sessionStorage.getItem("adresse"))

    const dataCall = async (requestOptions) => {

        let responseData = await fetch("http://localhost:8000/products", requestOptions);
        const responseDataInJSON = await responseData.json();
        setAllData(responseDataInJSON)

    }

    const callAPI = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        await dataCall(requestOptions)

        let response = await fetch(`http://localhost:8000/cart/${userId}`, requestOptions);
        const responseInJSON = await response.json();
        if (responseInJSON.detail == "Cart not found") {
            setCart([])
            setEmptyCart(true)
            setIsLoad(true)
        }
        else {
            setCart(responseInJSON)
            setEmptyCart(false)
            setIsLoad(true)
        }
    }

    const checkEmptyCart = () => {
        if (token != null || token != "undefined") {
            return
        }
        else {
            if (currentCart == null || currentCart.length == 0) {
                setEmptyCart(true)
            }
            else {
                setEmptyCart(false)
            }
        }
    }

    const createCart = () => {
        if (!emptyCart) {
            cart.items.forEach((product) => {
                let userProduct = allData.find((dbProduct) => {
                    return product.product_id == dbProduct._id
                })
                let finalUserProduct = { id: userProduct._id, name: userProduct.nom, img: userProduct.images[0], price: userProduct.prix, quantity: product.quantity, description: userProduct.short_description }
                userCart.push(finalUserProduct)
            });
        }
    }

    const showTotal = () => {
        if (!emptyCart) {
            let total = 0
            cart.items.forEach((product) => {
                total += product.total_price
            })
            setTotal(total)
        }
    }


    function addDaysToDate(date, days) {
        var res = new Date(date);
        res.setDate(res.getDate() + days);
        return res;
    }

    const luhnTest = (cardNumber) => {
        let somme = 0;
        let paire = false;

        // Parcourir le numéro de carte de droite à gauche
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            const digit = parseInt(cardNumber.charAt(i), 10);

            if (paire) {
                // Doubler les chiffres des positions paires
                let doubledDigit = digit * 2;

                if (doubledDigit > 9) {
                    // Si le double est supérieur à 9, soustraire 9
                    doubledDigit -= 9;
                }

                somme += doubledDigit;
            } else {
                // Ajouter les chiffres des positions impaires
                somme += digit;
            }

            paire = !paire;
        }

        // La somme doit être divisible par 10 pour que le numéro soit valide
        return somme % 10 === 0;
    }

    const handleSubmit = async () => {


        if (luhnTest(cardNumber) == true) {

            var tmpDate = new Date();
            let delivery_date = addDaysToDate(tmpDate, 7);

            // vérifier le paiement + affichage de la facture
            // Appel API pour enregistrer la nouvelle commande

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({

                    delivery_date: String(delivery_date),
                    in_delivery: true,
                    total_price: total,
                    delivery_address: JSON.stringify(livraison),
                    payment_card: cardNumber,
                    user_id: userId,
                    details: cart.items,
                    cart_id: cart._id,
                    user_id: userId,
                })
            };

            try {
                let response = await fetch(`http://localhost:8000/orders`, requestOptions);
                let result = await fetch(`http://localhost:8000/cart/${userId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                })
            }
            catch (e) {
                console.log(e.message)
            }
        }
    }

    useEffect(() => {
        callAPI();

    }, [])

    useEffect(() => {
        showTotal()
    })

    checkEmptyCart()
    createCart()





    return (
        <div className='page'>
            <h1>Paiement</h1>
            <div className='trait'></div>
            <div className="paiement-page">
                <div className="paiement-choice">
                    <div className="choice-column">
                        <div className="choice-row">
                            <div className="first-part">
                                <input
                                    className="radio"
                                    type="radio"
                                    name="choice"
                                    value="saved"
                                    onClick={() => {
                                        setPaypal(false);
                                        setSavedCard(true)
                                    }} />
                                <p>Carte bancaire enregistrée </p>
                            </div>
                            <div className="second-part">
                                <img className="icon-cards" src={visa}></img>
                                <img className="icon-cards" src={mastercard}></img>
                            </div>
                        </div>
                        {savedCard
                            ?
                            <h3>**** **** **** ****</h3>
                            :
                            <></>
                        }
                    </div>

                    <div className='trait'></div>

                    <div className="choice-row-new-card">
                        <div className="choice-row">
                            <div className="first-part">
                                <input
                                    className="radio"
                                    type="radio"
                                    name="choice"
                                    value="new"
                                    onClick={() => {
                                        setPaypal(false);
                                        setSavedCard(false)
                                    }} />

                                <p>Paiement par carte bancaire</p>
                            </div>
                            <div className="second-part">
                                <img className="icon-cards" src={visa}></img>
                                <img className="icon-cards" src={mastercard}></img>
                            </div>
                        </div>
                        <div>
                            <form >
                                <div className="card-number">
                                    <label htmlFor="cardNumber">Numéro de carte:</label>
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="date-cvv">
                                    <div className="date">

                                        <label htmlFor="expiryDate">Date d'expiration:</label>
                                        <input
                                            type="text"
                                            id="expiryDate"
                                            value={expiryDate}
                                            onChange={(e) => setExpiryDate(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="cvv">
                                        <label htmlFor="cvv">CVV:</label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            value={cvv}
                                            onChange={(e) => setCvv(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>

                    <div className='trait'></div>

                    <div className="choice-column">
                        <div className="choice-row">

                            <div className="first-part">
                                <input
                                    className="radio"
                                    type="radio"
                                    name="choice"
                                    value="paypal"
                                    onClick={() => {
                                        setPaypal(true);
                                        setSavedCard(false)
                                    }} />

                                <p>Paiement par Paypal</p>

                            </div>
                        </div>
                        {paypal
                            ?
                            <button type="button">PayPal
                            </button>
                            :
                            <></>

                        }
                    </div>

                </div>

                <div className="cart-livraison">
                    <div className="resume-cart">
                        <h3>Votre Panier</h3>
                        <div className='cart-page'>
                            <div className='cart-content'>
                                {userCart.map((product) => {
                                    return (
                                        <div>
                                            <div className='resume-cart-details'>
                                                <img className='cart-img' src={product.img} alt={product.name + ' image'} />
                                                <div className="name-and-quatity">
                                                    <h4 className='product-cart-detail'>{product.name} </h4>
                                                    <p>{product.quantity}</p>
                                                </div>
                                                <h3 className='product-cart-detail'>{product.price} €</h3>
                                            </div>
                                            <div className='trait'></div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='total-paiement'>
                                <h2>Total : {total}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="resume-livraison">
                        <h3>Adresse de livraison</h3>
                        <div className="adresse-livraison">
                            <h4>{livraison.nom} - {livraison.prenom}</h4>
                            <p>{livraison.adresse}</p>
                            <p>{livraison.code_postale}</p>
                            <p>{livraison.ville}</p>
                        </div>

                    </div>
                </div>

            </div>
            <button className="button-paiement" type="button" onClick={handleSubmit}>Valider le paiement</button>

        </div >

    )
}

export default Paiement;