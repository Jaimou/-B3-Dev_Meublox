import { useParams } from 'react-router-dom';
import './ProductPage.scss'
import { useState } from 'react';
import data from '../../lib/data/dataTest.jsx'

const ProductPage = () => {

    const allData = data


    const { productId } = useParams()

    let product = allData.find((product) => {
        return product.Id == productId
    })
    let productImages = product.Gallery;


    const [quantity, setQuantity] = useState(1)

    const handleQuantityChange = (e) => {
        const target = e.target;
        let value = target.value;
        if (value < 1) {
            value = 1
        }
        if (value > 10) {
            value = 10
        }
        setQuantity(value);
    }

    const addToCart = () => {
        let input = document.getElementById('quantity')
        console.log(input)
        console.log(quantity)

        //faire l'appel API pour ajouter au panier le produit et sa quantité
        // id du produit : product.id
        // quantité : quantity
    }



    return (
        <div className='page'>
            <h3><a href='/products'>Produits</a> &gt; <a id='productType' href={'/products/category/' + product.Type}>{product.Type}</a> </h3>
            <h1>{product.Name}</h1>
            <div className='trait'></div>
            <div className='product-page'>

                <div className='images-gallery'>
                    <div className='images-collumn'>
                        {productImages.map((imgUrl) => {
                            return (
                                <img className='image-gallery' src={imgUrl} alt='image de gallerie' />
                            )
                        }
                        )}

                    </div>
                    <img className='image-first' src={product.ImageThumbnailUrl} alt={product.ShortDescription} />
                </div>

                <div className='product'>
                    <div className='details'>
                        <h1>{product.Name}</h1>
                        <h2>{product.Price} €</h2>
                    </div>
                    <div className='description'>
                        <p>{product.ShortDescription}</p>
                        <div className='toCart'>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;