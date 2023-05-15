import { useState } from "react";

const CartesPaiement = () => {

    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        // Envoie de la commande complète vers la BDD et le back pour validation + génération du PDF de commande

    };
    return (
        <>
            <h3>Mes cartes de Paiement</h3>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="card-number">
                        <label htmlFor="cardNumber">Numéro de carte:</label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div className="date-cvv">
                        <div className="date">

                            <label htmlFor="expiryDate">Date d'expiration:</label>
                            <input
                                type="text"
                                id="expiryDate"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="cvv">
                            <label htmlFor="cvv">CVV:</label>
                            <input
                                type="text"
                                id="cvv"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit">Ajouter une carte de paiement</button>
                </form>
            </div>

        </>
    )
}

export default CartesPaiement