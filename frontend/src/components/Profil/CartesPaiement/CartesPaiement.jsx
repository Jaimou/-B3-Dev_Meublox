import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";

const CartesPaiement = (props) => {

    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [luhn, setLuhn] = useState(false)
    const [verify, setVerify] = useState(1)

    let token = props.token;
    const myDecodedToken = decodeToken(token);
    const userId = myDecodedToken.user_id


    const checkLuhn = (number) => {

        if (number.length < 16) {
            return
        }
        else {
            // Inverser l'ordre et convertir chaque chiffre en nombre
            const digits = number
                .split('')
                .reverse()
                .map(Number);

            let sum = 0;

            for (let i = 0; i < digits.length; i++) {
                let digit = digits[i];

                if (i % 2 === 1) {
                    digit *= 2;
                    if (digit > 9) {
                        digit -= 9;
                    }
                }

                sum += digit;
            }
            setVerify(sum % 10);
            return verify

        }
    }

    useEffect(() => {
        if (verify == 0) {
            setLuhn(true)
        }
        else {
            setLuhn(false)
        }
    }, [checkLuhn])


    const addCreditCard = () => {
        // methode put pour modifier le user

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                numero_carte: cardNumber,
                date_expiration: expiryDate,
                cvv: cvv
            })
        };
        fetch(`http://localhost:8000/users/${userId}`, requestOptions)
            .then(response => {
                response.json();
            })

    };

    return (
        <>
            <h3>Mes cartes de Paiement</h3>
            <div>
                <form >
                    <div className="card-number">
                        <label htmlFor="cardNumber">Numéro de carte:</label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => { setCardNumber(e.target.value); checkLuhn(e.target.value); }}
                            required
                        />
                        {luhn ?
                            <></> :
                            <div>
                                <p className="error">La carte n'a pas de format valide</p>
                            </div>
                        }
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
                    <button type="submit" onClick={addCreditCard}>Ajouter une carte de paiement</button>
                </form>
            </div>

        </>
    )
}

export default CartesPaiement