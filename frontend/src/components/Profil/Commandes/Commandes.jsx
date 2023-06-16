import { useEffect, useState } from "react"
import { decodeToken } from "react-jwt"
import Order from "./Order"
import './Commandes.scss'

const Commandes = () => {

    const [orders, setOrders] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    const userToken = sessionStorage.getItem("token")
    const myDecodedToken = decodeToken(userToken);


    const getOrders = async () => {
        const userId = myDecodedToken.user_id

        let request = await fetch(`http://localhost:8000/orders/`, {
            method: 'GET',
        })
        let ordersList = await request.json();
        let userOrders = []
        ordersList.forEach(order => {
            if (order.user_id == userId) {
                userOrders.push(order)
            }
        });

        setOrders(userOrders)
        setIsLoad(true)
    }

    useEffect(() => {
        getOrders()
        setIsLoad(true)
    }, [])


    return (
        <>
            {isLoad ?
                <div className="commandes-list">
                    <h2>Commandes</h2>

                    {orders.length == 0 ?
                        <p>Vous n'avez aucune commande enregistrée</p>

                        :

                        <>
                            {orders.map((order) => {
                                return (
                                    <Order order={order} />
                                )
                            })
                            }
                        </>

                    }
                </div>
                :
                <h2 className='loading'>Loading</h2>
            }

        </>
    )
}

export default Commandes
