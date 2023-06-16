import './Panier.scss'
import { useNavigate } from 'react-router-dom'
import ReactSelect from "react-select";
import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';


const Panier = () => {

    const [allData, setAllData] = useState([])
    const [cart, setCart] = useState([])
    const [isLoad, setIsLoad] = useState(false)
    const [emptyCart, setEmptyCart] = useState(false)
    const [update, setUpdate] = useState(0)


    let navigate = useNavigate();
    let userCart = []
    let currentCart = JSON.parse(sessionStorage.getItem("cart"));
    const [total, setTotal] = useState(0)
    let optionsProductValues = [];
    let i = 0


    const token = sessionStorage.getItem("token");
    const myDecodedToken = decodeToken(token);
    const userId = myDecodedToken.user_id

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
            setCart(responseInJSON.items)
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
            cart.forEach((product) => {
                let userProduct = allData.find((dbProduct) => {
                    return product.product_id == dbProduct._id
                })
                let finalUserProduct = { id: userProduct._id, name: userProduct.nom, img: userProduct.images[0], price: userProduct.prix, quantity: product.quantity, description: userProduct.short_description }
                userCart.push(finalUserProduct)
            });
        }
    }

    const productValues = () => {
        if (cart == []) {
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
        else {
            cart.forEach(product => {
                optionsProductValues.push({
                    id: product._id,
                    options: [
                        { value: 1, label: "1", id: product._id },
                        { value: 2, label: "2", id: product._id },
                        { value: 3, label: "3", id: product._id },
                        { value: 4, label: "4", id: product._id },
                        { value: 5, label: "5", id: product._id },
                        { value: 6, label: "6", id: product._id },
                        { value: 7, label: "7", id: product._id },
                        { value: 8, label: "8", id: product._id },
                        { value: 9, label: "9", id: product._id },
                        { value: 10, label: "10", id: product._id },
                    ]
                });
            });
        }

    }

    const updateCart = async (e) => {
        let newQuantity = e.value;
        let targetId = e.id;
        let i = update
        if (cart == []) {
            let productIndex = currentCart.findIndex(product => targetId == product._id);

            currentCart[productIndex].productQuantity = newQuantity;
            localStorage.setItem("cart", JSON.stringify(currentCart));
            window.location.reload(true)
        }
        else {
            let product = cart.find(product => targetId == product._id)
            let productId = product.product_id
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ quantity: newQuantity })
            };
            await fetch(`http://127.0.0.1:8000/cart/${userId}/${productId}`, requestOptions);
            setUpdate(i + 1)
        }

    }

    const removeProduct = async (e) => {
        let targetId = e.target.id;
        let targetProductId = targetId.split("-")[1];
        if (cart == []) {
            let productIndex = currentCart.findIndex(product => targetProductId == product.id);
            currentCart.splice(productIndex, 1);
            localStorage.setItem("cart", JSON.stringify(currentCart));
            window.location.reload(true)
        }
        else {
            let product = cart.find(productData => targetProductId == productData.product_id)
            let productId = product.product_id
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            };
            await fetch(`http://127.0.0.1:8000/cart/${userId}/${productId}`, requestOptions);
            setUpdate(i + 1)
        }
    }

    const showTotal = () => {
        let total = 0
        cart.forEach((product) => {
            total += product.total_price
        })
        setTotal(total)
    }

    useEffect(() => {
        callAPI()
    }, [])

    useEffect(() => {
        showTotal()
    })

    useEffect(() => {
        callAPI()
        showTotal()
    }, [update])

    checkEmptyCart()
    createCart()
    productValues()

    return (
        <div className='page'>
            {isLoad ?
                <>
                    <h1>Votre Panier</h1>
                    <div className='trait'></div>
                    <div className='cart-page'>
                        {emptyCart ?
                            <div className='empty-cart'>
                                <h2>Votre panier est actuellement vide</h2>
                                <button type='button' onClick={() => { navigate('/') }} >Aller à la page d'accueil</button>
                            </div> :

                            <div className='cart-content'>
                                {userCart == [] ?
                                    <>
                                        {
                                            userCart.map((product) => {
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
                                                                        onChange={((e) => { updateCart(e) })} />
                                                                </div>
                                                                <h4 className='product-cart-detail'>{product.price} €</h4>
                                                            </div>
                                                            <button id={`button-${product.id}`} type='button' onClick={removeProduct}>Delete</button>
                                                        </div>
                                                        <div className='trait'></div>
                                                    </div>

                                                )
                                            })
                                        }
                                    </> :
                                    <>
                                        {
                                            userCart.map((product) => {
                                                i += 1
                                                return (
                                                    <div>
                                                        <div className='cart-row'>
                                                            <div className='cart-row-details'>
                                                                <img className='cart-img' src={product.img} alt={product.name + ' image'} />
                                                                <h3 className='product-cart-detail'>{product.name} </h3>
                                                                <p>{product.description}</p>
                                                                <div id={product._id} className='product-cart-detail quantity-detail'>
                                                                    <ReactSelect
                                                                        inputId={`quantity-button-${product.id}`}
                                                                        options={optionsProductValues[i - 1].options}
                                                                        defaultValue={{ label: product.quantity, value: product.quantity }}
                                                                        onChange={((e) => { updateCart(e) })} />
                                                                </div>
                                                                <h4 className='product-cart-detail'>{product.price} €</h4>
                                                            </div>
                                                            <button id={`button-${product.id}`} type='button' onClick={removeProduct}>Delete</button>
                                                        </div>
                                                        <div className='trait'></div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                }
                            </div>
                        }
                        <div className='total-paiement'>
                            <h2>Total : {total}</h2>
                            <button id='paiement-button' type='button' onClick={() => {
                                if (token != null || token != "undefined") {
                                    navigate('/livraison')
                                }
                                else {
                                    navigate('/login')
                                }
                            }}>Payer</button>
                        </div>


                    </div>
                </>
                :
                <h2 className='loading'>Loading</h2>
            }

        </div>
    )
}


export default Panier