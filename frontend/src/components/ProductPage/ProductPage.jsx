import { useNavigate, useParams } from 'react-router-dom';
import './ProductPage.scss'
import { useEffect, useState } from 'react';
// import data from '../../lib/data/dataTest.jsx'
import StarRating from '../starRating/StarRating';
import { useGetCart } from '../../hooks/Cart/useGetCart';
import { useGetProduct } from '../../hooks/Products/useGetProduct';
import { useUserStatus } from '../../hooks/useUserStatus';

const ProductPage = () => {


    // const allData = data

    const navigate = useNavigate()
    const { productId } = useParams()
    // const log = useUserStatus()
    const cart = useGetCart()

    const product = useGetProduct(productId)
    console.log("product = ")
    console.log(product)
    // let product = allData.find((product) => {
    //     return product.Id == productId
    // })
    // let productImages = product.Gallery;

    const [quantity, setQuantity] = useState(1)

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

    const addToCart = () => {

    }

    // useEffect(() => {
    //     let newProduct = { id: productId, productQuantity: quantity };
    //     let cart = null;
    //     if (log) {
    //         cart = useCart(newProduct);
    //         return cart
    //     }
    //     else {
    //         cart = useCart(newProduct);
    //         return cart
    //     }
    // }, [addToCart])


    // let currentCart = JSON.parse(localStorage.getItem("cart"));

    // if (currentCart == null) {
    //     currentCart = [];
    //     currentCart.push(newProduct);
    //     localStorage.setItem("cart", JSON.stringify(currentCart));
    // }
    // else {

    //     if (currentCart.some(product => product.id === newProduct.id)) {
    //         product = currentCart.find(product => product.id === newProduct.id)
    //         product.productQuantity += quantity;

    //         if (newProduct.productQuantity > 10) {
    //             newProduct.productQuantity = 10;
    //         }
    //         localStorage.setItem("cart", JSON.stringify(currentCart));

    //     }

    //     else {
    //         currentCart.push(newProduct);
    //         localStorage.setItem("cart", JSON.stringify(currentCart));
    //     }
    // }
    // window.location.reload(true)


    return (
        <div className='page'>
            <h3><a href='/products'>Produits</a> &gt; <a id='productType' href={'/products/category/' + product.type}>{product.type}</a> </h3>
            <h1>{product.name}</h1>
            <div className='trait'></div>
            <div className='product-page'>

                <div className='images-gallery'>
                    <div className='images-collumn'>
                        {product.gallery.map((imgUrl) => {
                            return (
                                <img className='image-gallery' src={imgUrl} alt='image de gallerie' />
                            )
                        }
                        )}

                    </div>
                    <img className='image-first' src={product.imageThumbnailUrl} alt={product.shortDescription} />
                </div>

                <div className='product'>
                    <div className='details'>
                        <h1>{product.name}</h1>
                        <h2>{product.price} €</h2>
                    </div>
                    <div className='description'>
                        <p className='long-description'>{product.shortDescription}</p>
                        <div className='rate'>
                            <StarRating rate={product.rate} /><p>({product.rates.length})</p>
                        </div>
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
        </div>
    )
}

export default ProductPage;