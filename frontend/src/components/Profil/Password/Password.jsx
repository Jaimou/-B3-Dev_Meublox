import { useRef, useState } from "react";
import { decodeToken } from "react-jwt";

const Password = (props) => {

    let profil = props.profil;
    let token = props.token;
    const myDecodedToken = decodeToken(token);
    const userId = myDecodedToken.user_id

    const [errors, setErrors] = useState({});

    const [inputs, setInputs] = useState({
        password: ``,
        newPassword: ``,
        newPasswordConfirmation: ``,
    });

    const passwordForm = useRef();

    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");



    const handleInputChange = (event) => {
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    };

    const validate = () => {
        let errors = {};
        if (inputs.password == "") {
            errors.password = 'Le mot de passe actuel est obligatoire';
        }
        if (!passwordRegex.test(inputs.newPassword)) {
            errors.newPassword = 'Le nouveau mot de passe doit contenir 8 caractères minimum dont 1 maujscule, 1 minuscule , 1 chiffre et 1 caractère spécial au minimum';
        }
        if (inputs.newPassword != inputs.newPasswordConfirmation) {

            errors.newPasswordConfirmation = 'Les nouveaux mots de passe ne correspondent pas';
        }
        setErrors(errors);
        return errors;
    };


    const modifySubmit = async () => {
        // methode put pour modifier le user

        if (inputs.newPassword == inputs.newPasswordConfirmation) {

            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: inputs.newPassword
                })
            };
            let response = await fetch(`http://localhost:8000/users/${userId}`, requestOptions);
            let result = response.json;

        }

    }


    return (
        <div>
            <h3>Modifier mon mot de passe</h3>
            <form ref={passwordForm} className="password-form">
                <div className="form-div">
                    <label htmlFor="password">Mot de passe actuel: </label>
                    <input
                        className="contact-input"
                        type="password"
                        required="true"
                        id="password"
                        name="password"
                        value={inputs.email}
                        onChange={(e) => { handleInputChange(e); validate() }}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-div">
                    <label htmlFor="newPassword">Nouveau mot de passe: </label>
                    <input
                        className="contact-input"
                        type="password"
                        required="true"
                        id="newPassword"
                        name="newPassword"
                        value={inputs.email}
                        onChange={(e) => { handleInputChange(e); validate() }}
                    />
                    {errors.newPassword && <span className="error">{errors.newPassword}</span>}
                </div><div className="form-div">
                    <label htmlFor="newPasswordConfirmation">Confirmer le nouveau mot de passe: </label>
                    <input
                        className="contact-input"
                        type="password"
                        required="true"
                        id="newPasswordConfirmation"
                        name="newPasswordConfirmation"
                        value={inputs.email}
                        onChange={(e) => { handleInputChange(e); validate() }}
                    />
                    {errors.newPasswordConfirmation && <span className="error">{errors.newPasswordConfirmation}</span>}
                </div>


                <button type="button" onClick={modifySubmit}>Valider</button>
            </form>
        </div>
    )
}

export default Password