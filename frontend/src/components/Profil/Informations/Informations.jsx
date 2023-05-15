import { useRef, useState } from "react";

const Informations = (props) => {
    let profil = props.profil;

    const [errors, setErrors] = useState({});

    const [inputs, setInputs] = useState({
        email: `${profil.email}`,
        gender: `${profil.gender}`,
        firstName: `${profil.firstName}`,
        lastName: `${profil.lastName}`,
        adress: `${profil.adress}`,
        city: `${profil.city}`,
        cp: `${profil.cp}`,
    });

    const [modify, setModify] = useState(false)

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
        if (!/[a-z]/.test(inputs.firstName)) {
            errors.firstName = 'Le prénom semble trop court';
        }
        if (!/[a-z]/.test(inputs.lastName)) {

            errors.lastName = 'Le nom semble trop court';
        }
        if (!/[0-9]{5}/.test(inputs.cp)) {
            errors.cp = 'Le code postal est incorrect';
        }
        return errors;
    };




    const modifySubmit = () => {

        // methode put pour modifier le user

    }

    const toModify = () => {
        setModify(true);
    }

    return (
        <>
            <div className="profil-infos">
                {modify
                    ?
                    <div>
                        <h2>Email : {profil.email}</h2>
                        <h2>Civilité : {profil.gender}</h2>
                        <h2>Prénom : {profil.firstName}</h2>
                        <h2>Nom : {profil.lastName}</h2>
                        <h2>Adresse : {profil.adress}</h2>
                        <h2>Ville : {profil.city}</h2>
                        <h2>Code Postal : {profil.cp}</h2>
                        <button type="button" onClick={toModify}>Modifier</button>
                    </div>
                    :
                    <div>
                        <form ref={profilForm} className="profil-form" onSubmit={modifySubmit}>
                            <div className="form-div">
                                <label htmlFor="email">Email: </label>
                                <input
                                    className="contact-input"
                                    type="email"
                                    required="true"
                                    id="email"
                                    name="email"
                                    value={inputs.email}
                                    onChange={handleInputChange}
                                />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Madame" />Mme
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Monsieur" />M
                            </div>
                            <div className="form-div">
                                <label htmlFor="firstName">Prénom: </label>
                                <input
                                    className="profil-form-input"
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={inputs.firstName}
                                    onChange={handleInputChange}
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
                                    value={inputs.name}
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
                                />
                                {errors.name && <span className="error">{errors.cp}</span>}
                            </div>
                            <button type="submit">Valider</button>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}

export default Informations