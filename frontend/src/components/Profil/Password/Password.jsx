import { useRef, useState } from "react";

const Password = () => {

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
        if (!inputs.password) {
            errors.email = 'Le mot de passe actuel est obligatoire';
        }
        if (passwordRegex.test(inputs.newPassword)) {
            errors.firstName = 'Le nouveau mot de passe doit contenir 8 caractères minimum dont 1 maujscule, 1 minuscule , 1 chiffre et 1 caractère spécial au minimum';
        }
        if (inputs.newPasswordConfirmation != inputs.newPasswordConfirmation) {

            errors.lastName = 'Les nouveaux mots de passe ne correspondent pas';
        }
        setErrors(errors);
        return errors;
    };




    const modifySubmit = () => {

        // methode put pour modifier le user

    }
    return (
        <div>
            <h3>Modifier mon mot de passe</h3>
            <form ref={passwordForm} className="password-form" onSubmit={modifySubmit}>
                <div className="form-div">
                    <label htmlFor="actual-password">Mot de passe actuel: </label>
                    <input
                        className="contact-input"
                        type="text"
                        required="true"
                        id="actual-password"
                        name="actual-password"
                        value={inputs.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-div">
                    <label htmlFor="new-password">Nouveau mot de passe: </label>
                    <input
                        className="contact-input"
                        type="text"
                        required="true"
                        id="new-password"
                        name="new-password"
                        value={inputs.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <span className="error">{errors.newPassword}</span>}
                </div><div className="form-div">
                    <label htmlFor="new-password-confirmation">Confirmer le nouveau mot de passe: </label>
                    <input
                        className="contact-input"
                        type="text"
                        required="true"
                        id="new-password-confirmation"
                        name="new-password-confirmation"
                        value={inputs.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <span className="error">{errors.newPasswordConfirmation}</span>}
                </div>


                <button type="submit">Valider</button>
            </form>
        </div>
    )
}

export default Password