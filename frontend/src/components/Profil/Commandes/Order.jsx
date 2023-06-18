import { useNavigate } from "react-router-dom";
import './Commandes.scss';

const Order = (props) => {

    const order = props.order;
    const navigate = useNavigate()

    return (


        <div className="order">
            <div className="order-infos">
                <div className="order-id-status">
                    <h3>Commande n° {order._id}</h3>
                    {order.status == "pending"
                        ? <h3>En cours de livraison</h3>
                        : <h3>Livrée le : {order.delivery_date.split(" ")[2]} {order.delivery_date.split(" ")[1]} {order.delivery_date.split(" ")[3]}</h3>
                    }
                </div>
                <h2 className="order-price">{order.total_price} €</h2>
            </div>
            <button type="button" onClick={() => navigate(`${order._id}`)}>Afficher les détails</button>

        </div>
    )
}

export default Order