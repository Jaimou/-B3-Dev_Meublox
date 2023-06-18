import { useNavigate } from 'react-router-dom';
import '../login/Login.scss';
import { useState } from 'react';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [isSend, setIsSend] = useState(false)


    const handleChangeEmail = () => {
        let input = document.getElementById('email')
        setEmail(input.value)
    }

    const handleSendEmail = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
            })
        };
        try {
            let response = await fetch("http://localhost:8000/reset-password", requestOptions);
            const responseInJSON = await response.json();
            setIsSend(true)
        }
        catch (e) {
            console.log(e.message)
        }

    }


    const navigate = useNavigate()


    return (
        <div className='login-page'>
            <h1>Authentification</h1>
            <div className='trait'></div>
            <div className="login-block">
                <h2>Mot de passe oublié</h2>
                <input id="email" className="form" type="text" value={email} aria-label="email" placeholder="email" onChange={handleChangeEmail}></input>

                <button className='validation' type='button' onClick={() => {
                    handleSendEmail();
                }}>Envoyer l'email de réinitialisation</button>
                {isSend ?
                    <>
                        <p>Email de réinitialisation de mot de passe envoyé</p>
                        <button className='validation' type='button' onClick={() => {
                            navigate("/");
                        }}>Retour sur la page d'accueil</button>
                    </>

                    :
                    <></>}

            </div>
        </div>
    );
}

export default ForgotPassword;