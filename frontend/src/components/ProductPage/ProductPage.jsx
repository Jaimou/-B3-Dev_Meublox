import { useNavigate, useParams } from 'react-router-dom';
import './ProductPage.scss'
import { useEffect, useState } from 'react';
import StarRating from '../starRating/StarRating';
import { decodeToken } from 'react-jwt';
import Vote from '../starRating/Vote';


const ProductPage = () => {


    const navigate = useNavigate()
    const { productId } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [actualCart, setActualCart] = useState([""])

    const [product, setProduct] = useState()
    const [isLoad, setIsLoad] = useState(false)

    const token = sessionStorage.getItem("token");
    const myDecodedToken = decodeToken(token);





    useEffect(() => {
        callAPI()
        callAPIForCart()
    }, [])

    const callAPI = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        let response = await fetch(`http://127.0.0.1:8000/products/${productId}`, requestOptions);
        const responseInJSON = await response.json();
        setProduct(responseInJSON)
        setIsLoad(true)

    }

    const callAPIForCart = async () => {
        if (myDecodedToken != "undefined" && myDecodedToken != null) {
            const userId = myDecodedToken.user_id

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            let response = await fetch(`http://127.0.0.1:8000/cart/${userId}`, requestOptions);
            const responseInJSON = await response.json();
            setActualCart(responseInJSON)
        }
    }

    const handleQuantityChange = (e) => {
        const target = e.target;
        let value = Number(target.value);
        if (value < 1) {
            value = 1
        }
        if (value > 10) {
            value = 10
        }
        setQuantity(value);
    }

    const addToLocalCart = (newProduct) => {
        let currentCart = JSON.parse(sessionStorage.getItem("cart"));
        if (currentCart == null) {
            currentCart = [];
            currentCart.push(newProduct);
            localStorage.setItem("cart", JSON.stringify(currentCart));
        }
        else {
            checkIsInLocalCart(newProduct, currentCart)

        }
    }

    const checkIsInLocalCart = (newProduct, currentCart) => {
        if (currentCart.some(productFound => productFound.id === newProduct.id)) {
            let productFound = currentCart.find(product => product.id === newProduct.id)
            productFound.productQuantity += quantity;

            checkProductQuantity(productFound, currentCart)
        }
        else {
            currentCart.push(newProduct);
            sessionStorage.setItem("cart", JSON.stringify(currentCart));
        }
    }

    const checkProductQuantity = (productFound, currentCart) => {
        if (productFound.productQuantity > 10) {
            productFound.productQuantity = 10;
        }
        sessionStorage.setItem("cart", JSON.stringify(currentCart));
    }

    const addToCartApi = async () => {
        if (myDecodedToken != "undefined" && myDecodedToken != null) {
            const userId = myDecodedToken.user_id
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user_id: userId,
                    items: [
                        {
                            product_id: productId,
                            quantity: quantity
                        }
                    ]
                })
            };
            await fetch(`http://127.0.0.1:8000/cart`, requestOptions);
        }
    }

    const addMoreProduct = async (quant) => {
        if (myDecodedToken != "undefined" && myDecodedToken != null) {
            const userId = myDecodedToken.user_id
            let newQuantity = quant + quantity
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ quantity: newQuantity })
            };
            await fetch(`http://127.0.0.1:8000/cart/${userId}/${productId}`, requestOptions);
        }
    }



    const addToCart = () => {
        if (token != null) {
            if (actualCart.detail != "Cart not found") {
                isCartExisting()
            }
            else {
                addToCartApi()
            }

        }
        else {
            let newProduct = { id: productId, productQuantity: quantity };
            addToLocalCart(newProduct)
        }
    };

    const isCartExisting = () => {
        let i = 0
        actualCart.items.map(
            (item) => {
                if (item.product_id == productId) {
                    addMoreProduct(item.quantity)
                }
                else {
                    i++
                }
            })

        if (i == actualCart.items.length) {

            addToCartApi()
        }
    }

    return (
        <div className='page'>
            {isLoad ?
                <>
                    <h3> <a href='/products'>Produits</a>
                        {product.categorie.map((categorie) => {
                            return (<>
                                &nbsp; &gt; &nbsp;
                                <a id='productType' href={'/products/category/' + categorie}>{categorie}</a>
                            </>
                            )
                        })}</h3>
                    <h1>{product.nom}</h1>
                    <div className='trait'></div>
                    <div className='product-page'>

                        <div className='images-gallery'>
                            <div className='images-collumn'>
                                {product.images.map((imgUrl) => {
                                    return (
                                        <img className='image-gallery' src={imgUrl} alt='image de gallerie' />
                                    )
                                }
                                )}

                            </div>
                            <img className='image-first' src={product.images[0]} alt={product.short_description} />
                        </div>

                        <div className='product'>
                            <div className='details'>
                                <h2>{product.short_description} - {product.prix}&nbsp;€</h2>

                            </div>
                            <div className='description'>
                                <p className='long-description'>{product.description}</p>
                                <div className='rate'>
                                    <StarRating note={product.note} /><p>({product.users_id.length})</p>
                                </div>
                                {myDecodedToken != "undefined" && myDecodedToken != null ?
                                    <Vote note={product.note} users_notes={product.users_notes} users_id={product.users_id} />
                                    :
                                    <>
                                    </>
                                }
                                <div className='trait'></div>
                                {product.stock == 0
                                    ? <p>Le produit n'est plus en stock</p>
                                    : <p>Nombre de produits en stock : {product.stock}</p>

                                }
                                <div className='trait'></div>
                                {product.stock == 0
                                    ? <button type='button' onClick={() => { navigate('/') }} >Aller à la page d'accueil</button>

                                    : <div className='toCart'>
                                        <p>Quantité :
                                            <input
                                                id="quantity"
                                                type="number"
                                                min={1}
                                                max={10}
                                                value={quantity}
                                                onChange={handleQuantityChange} /></p>
                                        <button className='addToCart' type='button' onClick={addToCart}>Ajouter au panier</button>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </> :
                <h2 className='loading'>Loading</h2>
            }
        </div>
    )
}

export default ProductPage;