import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CommandeDetails = () => {

    const { orderId } = useParams()
    console.log(orderId)
    const [order, setOrder] = useState()
    const [isLoad, setIsLoad] = useState(false)
    const [allData, setAllData] = useState([])

    const navigate = useNavigate()

    let userCart = []


    const getOrdersById = async () => {

        await dataCall()

        let request = await fetch(`http://localhost:8000/orders/${orderId}`, {
            method: 'GET',
        })
        let orderById = await request.json();
        setOrder(orderById)
        setIsLoad(true)
    }

    const dataCall = async (requestOptions) => {

        let responseData = await fetch("http://localhost:8000/products", requestOptions);
        const responseDataInJSON = await responseData.json();
        setAllData(responseDataInJSON)

    }

    const createCart = () => {
        if (isLoad) {
            console.log(order.details)
            order.details.forEach((product) => {
                let userProduct = allData.find((dbProduct) => {
                    return product.product_id == dbProduct._id
                })
                let finalUserProduct = { id: userProduct._id, nom: userProduct.nom, image: userProduct.images[0], prix: userProduct.prix, quantity: product.quantity, description: userProduct.short_description }
                userCart.push(finalUserProduct)
            }
            );
        }
    }

    useEffect(() => {
        getOrdersById()

    }, [])

    createCart()




    return (
        <div className="order">
            {isLoad ?
                <>
                    <div className="order-infos">
                        <div className="order-id-status">
                            <h3>Commande n° {order._id}</h3>
                            {order.in_delivery == true
                                ? <h3>En cours de livraison - Livraison prévue pour le : {order.delivery_date.split(" ")[2]} {order.delivery_date.split(" ")[1]} {order.delivery_date.split(" ")[3]} </h3>
                                : <h3>Livrée le : {order.delivery_date.split(" ")[2]} {order.delivery_date.split(" ")[1]} {order.delivery_date.split(" ")[3]}</h3>
                            }
                        </div>
                        <h2 className="order-price">Prix Total : {order.total_price} €</h2>
                    </div>
                    <div className="details">
                        <h2>Adresse de livraison :</h2>
                        <h3>{order.nom}</h3>
                        <h3>{order.adresse}</h3>
                        <h3>{order.adresse} {order.adresse}</h3>

                        <h2>Carte utilisée :</h2>
                        <h3>**** **** **** {order.payment_card.charAt(order.payment_card.length - 4)}{order.payment_card.charAt(order.payment_card.length - 3)}{order.payment_card.charAt(order.payment_card.length - 2)}{order.payment_card.charAt(order.payment_card.length - 1)}</h3>

                        <h2>Détails de la commande :</h2>
                        {userCart.map((product) => {
                            console.log(product)
                            return (
                                <div className='cart-row-details'>
                                    <img className='cart-img' src={product.image} alt={product.nom + ' image'} />
                                    <h3 className='product-cart-detail'>{product.nom} </h3>
                                    <p>{product.description}</p>
                                    <p>{product.quantity}</p>
                                    <h4 className='product-cart-detail'>{product.prix * product.quantity} - {`(${product.prix})`} €</h4>
                                </div>
                            )
                        })

                        }

                    </div>

                    <button type="button" onClick={() => navigate(`facture/${order._id}`)}>Télécharger la facture</button>
                </>
                :
                <>
                    <h2 className='loading'>Loading</h2>

                </>
            }

        </div>

    )
}


export default CommandeDetails