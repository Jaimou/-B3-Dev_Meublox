import { useNavigate } from 'react-router-dom';
import './Signin.scss';
import { useState } from 'react';

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');


    const LoginFunction = async () => {

        var details = {
            'username': email,
            'password': password,
            'grant_type': '',
            'scope': '',
            'client_id': '',
            'client_secret': '',
            'is_admin': false
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        let request = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
        let responseToken = await request.json();
        const userToken = (responseToken.access_token)

        sessionStorage.setItem("token", userToken)
        navigate("/")
    }

    const SigninFunction = async (email, password) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                role: "user",
                civilite: "",
                nom: "",
                prenom: "",
                adresse_postale: "",
                code_postal: "",
                ville: "",
                pays: "",
                telephone: "",
                date_naissance: "",
                password: password,
                is_admin: false
            })
        };
        let response = await fetch("http://localhost:8000/users", requestOptions);
        const responseInJSON = await response.json();
    }

    const handleSigninClick = async () => {

        if (password != passwordVerify) {
            return
        }

        await SigninFunction(email, password)

        await LoginFunction()

    }

    const handleChangeEmail = () => {
        let input = document.getElementById('email')
        setEmail(input.value)
    }

    const handleChangePassword = () => {
        let input = document.getElementById('password')
        setPassword(input.value)
    }

    const checkPassword = () => {
        let input = document.getElementById("password-verify")
        setPasswordVerify(input.value)
    }


    const navigate = useNavigate()


    return (
        <div className='signin-page'>
            <h1>Inscription</h1>
            <div className='trait'></div>
            <div className="signin-block">
                <h2>Sign in</h2>
                <input id="email" className="form" value={email} typeof="text" aria-label="email" placeholder="email" onChange={handleChangeEmail}></input>
                <input id="password" className="form" value={password} type="password" aria-label="password" placeholder="password" onChange={handleChangePassword}></input>
                <input id="password-verify" className="form" value={passwordVerify} type="password" aria-label="taper de nouveau le password" placeholder="taper de nouveau le password" onChange={checkPassword}></input>
                <div className='remember-validation'>
                    <div className='remember'>
                        <input type="checkbox" id="remember" name="remember" />
                        <label for="remember">Remember me !</label>
                    </div>
                    <button className='validation' type='submit' onClick={() => {
                        handleSigninClick();
                    }}>Sign In</button>
                </div>
                <div className='trait inside'></div>
                {/* <button className='validation' type='submit'>S'enregistrer avec Facebook</button>
                <button className='validation' type='submit'>S'enregister avec Google</button> */}
                <p>J'ai déjà un compte ? <br />
                    <a href='/login'>Je me connecte</a>
                </p>

            </div>
        </div>
    );
}

export default Signin;