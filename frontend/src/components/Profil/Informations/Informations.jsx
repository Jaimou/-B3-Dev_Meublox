import { useRef, useState } from "react";
import "./Informations.scss"
import { decodeToken } from "react-jwt";

const Informations = (props) => {
    let profil = props.profil;
    let token = props.token;
    const myDecodedToken = decodeToken(token);
    const userId = myDecodedToken.user_id


    const [errors, setErrors] = useState({});

    const [inputs, setInputs] = useState({
        email: `${profil.email}`,
        gender: `${profil.civilite}`,
        firstName: `${profil.prenom}`,
        lastName: `${profil.nom}`,
        adress: `${profil.adresse_postale}`,
        city: `${profil.ville}`,
        cp: `${profil.code_postal}`,
        pays: `${profil.pays}`,
        date_naissance: `${profil.date_naissance}`,
        telephone: `${profil.telephone}`
    });

    const [unModify, setUnmodify] = useState(true)

    const profilForm = useRef();



    const handleInputChange = (event) => {
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    };

    const validate = () => {
        let errors = {};
        if (!inputs.email) {
            errors.email = 'L\'adresse email est obligatoire';
        } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
            errors.email = 'L\'adresse email est invalide';
        }
        if (!/[a-z]3/.test(inputs.firstName)) {
            errors.firstName = 'Le prénom ne doit pas contenir de caractères spéciaux ni de chiffres';
        }
        if (!/[a-z]/.test(inputs.lastName)) {
            errors.lastName = 'Le nom ne doit pas contenir de caractères spéciaux ni de chiffres';
        }
        if (!/[0-9]{5}/.test(inputs.cp)) {
            errors.cp = 'Le code postal est incorrect';
        }
        return errors;
    };




    const modifySubmit = () => {

        // methode put pour modifier le user
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: inputs.email,
                civilite: inputs.civilite,
                nom: inputs.firstName,
                prenom: inputs.lastName,
                adresse_postale: inputs.adress,
                ville: inputs.city,
                code_postal: inputs.zipCode,
                telephone: inputs.telephone,
                date_naissance: inputs.date_naissance,
            })
        };
        fetch(`http://localhost:8000/users/${userId}`, requestOptions)
            .then(response => {
                response.json();
            })

        setUnmodify(true)

    }

    const toModify = () => {
        setUnmodify(false);
    }

    return (
        <>
            <div className="profil-infos">
                {unModify
                    ?
                    <div className="profil-form">
                        <div className="infos-div">
                            <h3 className="infos">Email : <h4>{inputs.email}</h4></h3>
                            <h3 className="infos">Civilité : <h4>{inputs.gender}</h4></h3>
                            <h3 className="infos">Prénom : <h4>{inputs.firstName}</h4></h3>
                            <h3 className="infos">Nom : <h4>{inputs.lastName}</h4></h3>
                            <h3 className="infos">Tel : <h4>{inputs.telephone}</h4></h3>
                            <h3 className="infos">Adresse : <h4>{inputs.adress}</h4></h3>
                            <h3 className="infos">Ville : <h4>{inputs.city}</h4></h3>
                            <h3 className="infos">Code Postal : <h4>{inputs.cp}</h4></h3>
                        </div>
                        <button type="button" onClick={toModify}>Modifier</button>
                    </div>
                    :
                    <div className="profil-form">
                        <form ref={profilForm} className="profil-form" onSubmit={modifySubmit}>
                            <div className="form-div">
                                <label htmlFor="email">Email: </label>
                                <input
                                    className="contact-input"
                                    type="email"
                                    required={true}
                                    id="email"
                                    name="email"
                                    value={inputs.email}
                                    onChange={() => { handleInputChange(); validate() }}
                                />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>
                            {inputs.gender == "Madame" ? <div className="form-div">
                                <input className="radio"
                                    type="radio"
                                    name="gender"
                                    value="Madame"
                                    defaultChecked
                                />Mme
                                <input className="radio"
                                    type="radio"
                                    name="gender"
                                    value="Monsieur" />M
                            </div> :
                                <></>}
                            {inputs.gender == "Monsieur" ? <div className="form-div">
                                <input className="radio"
                                    type="radio"
                                    name="gender"
                                    value="Madame"
                                />Mme
                                <input className="radio"
                                    type="radio"
                                    name="gender"
                                    value="Monsieur"
                                    defaultChecked
                                />M
                            </div> :
                                <></>}
                            {inputs.gender == "" ? <div className="form-div">
                                <input className="radio"
                                    type="radio"
                                    name="gender"
                                    value="Madame"

                                />Mme
                                <input className="radio"
                                    type="radio"
                                    name="gender"
                                    value="Monsieur" />M
                            </div> :
                                <></>}

                            <div className="form-div">
                                <label htmlFor="firstName">Prénom: </label>
                                <input
                                    className="profil-form-input"
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={inputs.firstName}
                                    onChange={(e) => { handleInputChange(e); validate() }}
                                />
                                {errors.name && <span className="error">{errors.firstName}</span>}
                            </div>
                            <div className="form-div">
                                <label htmlFor="lastName">Nom: </label>
                                <input
                                    className="profil-form-input"
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={inputs.lastName}
                                    onChange={(e) => { handleInputChange(e); validate() }}
                                />
                                {errors.name && <span className="error">{errors.lastName}</span>}
                            </div>
                            <div className="form-div">
                                <label htmlFor="lastName">Nom: </label>
                                <input
                                    className="profil-form-input"
                                    type="text"
                                    id="date_naissance"
                                    name="date_naissance"
                                    value={inputs.date_naissance}
                                    onChange={(e) => { handleInputChange(e); validate() }}
                                />
                                {errors.name && <span className="error">{errors.lastName}</span>}
                            </div>
                            <div className="form-div">
                                <label htmlFor="adress">Adresse: </label>
                                <input
                                    className="profil-form-input"
                                    type="text"
                                    id="adress"
                                    name="adress"
                                    value={inputs.adress}
                                    onChange={(e) => { handleInputChange(e); validate() }}
                                />
                                {errors.name && <span className="error">{errors.adress}</span>}
                            </div>
                            <div className="form-div">
                                <label htmlFor="city">Ville: </label>
                                <input
                                    className="profil-form-input"
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={inputs.city}
                                    onChange={(e) => { handleInputChange(e); validate() }}
                                />
                                {errors.name && <span className="error">{errors.city}</span>}
                            </div>
                            <div className="form-div">
                                <label htmlFor="cp">Code Postal: </label>
                                <input
                                    className="profil-form-input"
                                    type="text"
                                    id="cp"
                                    name="cp"
                                    value={inputs.cp}
                                    onChange={(e) => { handleInputChange(e); validate() }}
                                />
                                {errors.name && <span className="error">{errors.cp}</span>}
                            </div>
                            <div className="form-div">
                                <label htmlFor="city">Pays: </label>
                                <input
                                    className="profil-form-input"
                                    type="text"
                                    id="pays"
                                    name="pays"
                                    value={inputs.pays}
                                    onChange={(e) => { handleInputChange(e); validate() }}
                                />
                                {errors.name && <span className="error">{errors.city}</span>}
                            </div>
                            <button type="button" onClick={modifySubmit}>Valider</button>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}

export default Informations