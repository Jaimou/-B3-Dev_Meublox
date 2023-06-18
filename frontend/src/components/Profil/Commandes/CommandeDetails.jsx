import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Commandes.scss'


const CommandeDetails = () => {

    const { orderId } = useParams()
    const [order, setOrder] = useState()
    const [isLoad, setIsLoad] = useState(false)
    const [allData, setAllData] = useState([])
    const [deliveryAddress, setDeliveryAddress] = useState()

    const navigate = useNavigate()

    let userCart = []


    const getOrdersById = async () => {

        await dataCall()

        let request = await fetch(`http://localhost:8000/orders/${orderId}`, {
            method: 'GET',
        })
        let orderById = await request.json();
        setOrder(orderById)
        setDeliveryAddress(JSON.parse(orderById.delivery_address))
        setIsLoad(true)
    }

    const dataCall = async (requestOptions) => {

        let responseData = await fetch("http://localhost:8000/products", requestOptions);
        const responseDataInJSON = await responseData.json();
        setAllData(responseDataInJSON)

    }

    const createCart = () => {
        if (isLoad) {
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
        <>
            <h3><a href="/profile">Retour</a></h3>
            <div className="order">
                {isLoad ?
                    <>
                        <h3><a href="/profile">Retour</a></h3>
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
                            <h3>{deliveryAddress.nom}</h3>
                            <h3>{deliveryAddress.adresse}</h3>
                            <h3>{deliveryAddress.ville} {deliveryAddress.code_postal}</h3>

                            <h2>Carte utilisée :</h2>
                            <h3>**** **** **** {order.payment_card.charAt(order.payment_card.length - 4)}{order.payment_card.charAt(order.payment_card.length - 3)}{order.payment_card.charAt(order.payment_card.length - 2)}{order.payment_card.charAt(order.payment_card.length - 1)}</h3>

                            <h2>Détails de la commande :</h2>
                            {userCart.map((product) => {
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

                        <button type="button"><a href={`http://localhost:3000/facture/${order._id}`} target="_blank" rel="noreferrer" >Télécharger la facture</a></button>
                    </>
                    :
                    <>
                        <h2 className='loading'>Loading</h2>

                    </>
                }

            </div>
        </>

    )
}


export default CommandeDetails