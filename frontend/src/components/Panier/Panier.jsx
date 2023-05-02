import './Panier.scss'
import { useNavigate } from 'react-router-dom'
import ReactSelect from "react-select";
import data from '../../lib/data/dataTest.jsx'
import { useEffect, useState } from 'react';


const Panier = () => {

    let navigate = useNavigate();
    let emptyCart = true;
    let userCart = []
    let currentCart = JSON.parse(localStorage.getItem("cart"));
    let totalValue;
    const [total, setTotal] = useState(0)
    let optionsProductValues = [];
    let i = 0



    const checkEmptyCart = () => {
        if (currentCart == null || currentCart.length == 0) {
            emptyCart = true
        }
        else {
            emptyCart = false
        }
    }

    const productValues = () => {
        userCart.forEach(product => {
            optionsProductValues.push({
                id: product.id,
                options: [
                    { value: 1, label: "1", id: product.id },
                    { value: 2, label: "2", id: product.id },
                    { value: 3, label: "3", id: product.id },
                    { value: 4, label: "4", id: product.id },
                    { value: 5, label: "5", id: product.id },
                    { value: 6, label: "6", id: product.id },
                    { value: 7, label: "7", id: product.id },
                    { value: 8, label: "8", id: product.id },
                    { value: 9, label: "9", id: product.id },
                    { value: 10, label: "10", id: product.id },
                ]
            });
        });

    }

    const createCart = () => {
        if (!emptyCart) {
            currentCart.forEach(product => {
                let userProduct = data.find((dbProduct) => {
                    return product.id == dbProduct.Id
                })
                let finalUserProduct = { id: userProduct.Id, name: userProduct.Name, img: userProduct.ImageThumbnailUrl, price: userProduct.Price, quantity: product.productQuantity, description: userProduct.ShortDescription }
                userCart.push(finalUserProduct)

            });
        }
    }

    const changeQuantity = (e) => {
        let value = e.value;
        let targetId = e.id;
        let productIndex = currentCart.findIndex(product => targetId == product.id);
        currentCart[productIndex].productQuantity = value;
        localStorage.setItem("cart", JSON.stringify(currentCart));
        window.location.reload(true)

    }

    const removeProduct = (e) => {
        let targetId = e.target.id;
        let targetProductId = targetId.split("-")[1];
        let productIndex = currentCart.findIndex(product => targetProductId == product.id);
        currentCart.splice(productIndex, 1);
        localStorage.setItem("cart", JSON.stringify(currentCart));
        window.location.reload(true)
    }

    const showTotal = () => {
        userCart.forEach(product => {
            totalValue += product.price * product.quantity
            setTotal(totalValue)
        });
    }

    checkEmptyCart()
    createCart()
    productValues()

    console.log(optionsProductValues[1])

    useEffect(() => {
        totalValue = 0;
        showTotal()
    }, [])

    return (
        <div className='page'>
            <h1>Votre Panier</h1>
            <div className='trait'></div>
            <div className='cart-page'>
                {emptyCart ?
                    <div className='empty-cart'>
                        <h2>Votre panier est actuellement vide</h2>
                        <button type='button' onClick={() => { navigate('/') }} >Aller à la page d'accueil</button>
                    </div> :

                    <div className='cart-content'>
                        {userCart.map((product) => {
                            i += 1
                            return (
                                <div>
                                    <div className='cart-row'>
                                        <div className='cart-row-details'>
                                            <img className='cart-img' src={product.img} alt={product.name + ' image'} />
                                            <h3 className='product-cart-detail'>{product.name} </h3>
                                            <p>{product.description}</p>
                                            <div id={product.id} className='product-cart-detail quantity-detail'>
                                                <ReactSelect
                                                    inputId={`quantity-button-${product.id}`}
                                                    options={optionsProductValues[i - 1].options}
                                                    defaultValue={{ label: product.quantity, value: product.quantity }}
                                                    onChange={((e) => { changeQuantity(e) })} />
                                            </div>
                                            <h4 className='product-cart-detail'>{product.price} €</h4>
                                        </div>
                                        <button id={`button-${product.id}`} type='button' onClick={removeProduct}>Delete</button>
                                    </div>
                                    <div className='trait'></div>
                                </div>

                            )
                        })}
                    </div>
                }
                <div className='total-paiement'>
                    <h2>Total : {total}</h2>
                    <button id='paiement-button' type='button' onClick={() => { navigate('/livraison') }}>Payer</button>
                </div>


            </div>
        </div>
    )
}

export default Panier