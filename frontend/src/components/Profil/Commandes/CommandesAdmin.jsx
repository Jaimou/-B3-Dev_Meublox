import Order from "./Order";

const CommandesAdmin = (orders) => {

    const ordersList = orders.orders;

    return (
        <div className="commandes-list">
            <h2>Commandes</h2>
            {ordersList.length > 0 ?
                <>
                    {ordersList.map((order) => {
                        return (
                            <Order order={order} />
                        )
                    })
                    }
                </>
                :
                <>
                    <p>Aucune commande n'a été réalisée pour le moment</p>
                </>
            }

        </div>
    )
}

export default CommandesAdmin
