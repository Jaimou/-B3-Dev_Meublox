import { useNavigate } from "react-router-dom";

const Commande = (props) => {

    const order = props.order;
    const navigate = useNavigate()

    return (
        <div className="order">
            <div className="order-infos">
                <div className="order-id-status">
                    <h3>Commande n° {order.id}</h3>
                    {order.status == "pending"
                        ? <h3>En cours de livraison</h3>
                        : <h3>Livrée le : {order.deliveredDate}</h3>
                    }
                </div>
                <h2 className="order-price">{order.price} €</h2>
            </div>
            <button type="button" onClick={() => navigate(`profil/commandes/${order.id}`)}>Afficher les détails</button>

        </div>
    )
}

export default Commande