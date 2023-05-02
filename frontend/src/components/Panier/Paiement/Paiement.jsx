import { useEffect, useState } from "react";
import mastercard from "../../../mastercard.svg"
import visa from "../../../visa.svg"
import "./Paiement.scss"
import data from '../../../lib/data/dataTest.jsx'
// import PaypalButton from "./PaypalButton";


const Paiement = () => {

    let userCart = []
    let currentCart = JSON.parse(localStorage.getItem("cart"));
    let totalValue;
    const [total, setTotal] = useState(0)
    const [paypal, setPaypal] = useState(false)
    const [savedCard, setSavedCard] = useState(false)


    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    const handlePaypalSuccess = () => {
        console.log(`Success`);
    };


    const createCart = () => {

        currentCart.forEach(product => {
            let userProduct = data.find((dbProduct) => {
                return product.id == dbProduct.Id
            })
            let finalUserProduct = { id: userProduct.Id, name: userProduct.Name, img: userProduct.ImageThumbnailUrl, price: userProduct.Price, quantity: product.productQuantity, description: userProduct.ShortDescription }
            userCart.push(finalUserProduct)

        });

    }

    const showTotal = () => {
        userCart.forEach(product => {
            totalValue += product.price * product.quantity
            setTotal(totalValue)
        });
    }

    createCart()

    useEffect(() => {
        totalValue = 0;
        showTotal()
    }, [])






    const handleSubmit = (e) => {
        e.preventDefault();
        // Envoie de la commande complète vers la BDD et le back pour validation + génération du PDF de commande

    };


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
                            <h3>**** **** **** 1234</h3>
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
                            <form onSubmit={handleSubmit}>
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
                            // <div>
                            //     <script src="https://www.paypal.com/sdk/js?client-id=AYuy588Wn5t0O_f2CgatxFkaxFf4NHDWtxtBtnAnm0617XYHa_LOxLVOMqjRV6vBNKYbwn_-9lqaP0-U"></script>
                            //     <PaypalButton />
                            // </div>
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
                            <h4>Nom Prénom</h4>
                            <p>Adresse</p>
                            <p>Code Postal</p>
                            <p>Ville</p>
                        </div>

                    </div>
                </div>

            </div>
            <button className="button-paiement" type="submit">Valider le paiement</button>

        </div >

    )
}

export default Paiement;