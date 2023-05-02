import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Livraison.scss"

const Livraison = () => {

    const navigate = useNavigate();

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [cp, setCp] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        //Enregistrement des données pour envoyer la commande en BDD
        let livraison = { lastName: lastName, firstName: firstName, address: address, cp: cp, city: city }
        localStorage.setItem(livraison)
    };

    return (
        <div className='page'>
            <h1>Adresse de Livraison</h1>
            <div className='trait'></div>
            <form className="livraison-form" onSubmit={handleSubmit}>
                <label htmlFor="lastName">Nom:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    required
                />
                <br />

                <label htmlFor="firstName">Prénom:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    required
                />
                <br />

                <label htmlFor="address">Adresse:</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                />
                <br />

                <label htmlFor="city">Ville:</label>
                <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    required
                />
                <br />

                <label htmlFor="cp">Code Postal:</label>
                <input
                    type="text"
                    id="cp"
                    value={cp}
                    onChange={(event) => setCp(event.target.value)}
                    required
                />
                <br />

                <button type="submit">Valider l'adresse de livraison</button>
            </form>
        </div>
    );
};

export default Livraison;