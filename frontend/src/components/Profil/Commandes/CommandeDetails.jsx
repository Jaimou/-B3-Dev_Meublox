const CommandeDetails = () => {

    let commande;
    const { commandeId } = useParams()

    const getOrderById = () => {
        // appel APi la commande par Id
        // commande = fetch("")
    }

    return (
        <div className="order">
            <div className="order-infos">
                <div className="order-id-status">
                    <h3>Commande n° {commande.id}</h3>
                    {commande.status == "pending"
                        ? <h3>En cours de livraison</h3>
                        : <h3>Livrée le : {commande.deliveredDate}</h3>
                    }
                </div>
                <h2 className="order-price">{commande.price} €</h2>
            </div>
            <div className="details">
                <h2>Adresse de livraison :</h2>
                <h3>{commande.name}</h3>
                <h3>{commande.adress}</h3>
                <h3>{commande.postalCode} {commande.city}</h3>

                <h2>Carte utilisée :</h2>
                <h3>{commande.card}</h3>

                <h2>Détails de la commande :</h2>

            </div>
        </div>

    )
}

export default CommandeDetails