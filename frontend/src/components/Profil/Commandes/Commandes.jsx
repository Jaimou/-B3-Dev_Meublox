
const Commandes = () => {
    let orders = []


    const getOrders = () => {
        // appel APi liste commande
    }

    return (
        <div className="commandes-list">
            {orders.map((order) => {
                <Commandes order={order} />
            })}
            <h2>Commandes</h2>
        </div>
    )
}

export default Commandes
