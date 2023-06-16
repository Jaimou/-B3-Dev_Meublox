import { useNavigate } from 'react-router-dom';
import './Login.scss';
import Home from '../../Home/Home';
import { useState } from 'react';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginClick = async () => {

        var details = {
            'username': email,
            'password': password,
            'grant_type': '',
            'scope': '',
            'client_id': '',
            'client_secret': '',
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        try {
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
        catch (e) {
            console.log(e.message)
        }
    }

    const handleChangeEmail = () => {
        let input = document.getElementById('email')
        setEmail(input.value)
    }

    const handleChangePassword = () => {
        let input = document.getElementById('password')
        setPassword(input.value)
    }


    const navigate = useNavigate()


    return (
        <div className='login-page'>
            <h1>Authentification</h1>
            <div className='trait'></div>
            <div className="login-block">
                <h2>Login</h2>
                <input id="email" className="form" type="text" value={email} aria-label="email" placeholder="email" onChange={handleChangeEmail}></input>
                <input id="password" className="form" type="password" value={password} aria-label="password" placeholder="password" onChange={handleChangePassword}></input>
                <div className='remember-validation'>
                    {/* <div className='remember'>
                        <input type="checkbox" id="remember" name="remember" />
                        <label htmlFor="remember">Remember me !</label>
                    </div> */}
                    <button className='validation' type='button' onClick={() => {
                        handleLoginClick();
                    }}>Login</button>
                </div>
                <div className='trait inside'></div>
                {/* <button className='validation' type='submit'>Se connecter avec Facebook</button>
                <button className='validation' type='submit'>Se connecter avec Google</button> */}
                <p>Je n'ai pas de compte ? <br />
                    <a href='/signin'>Je m'inscris</a>
                </p>
                <div className='trait inside'></div>
                <p>Mot de passe oublié ? <br />
                    <a href='/forgot'>Je clique ici</a>
                </p>

            </div>
        </div>
    );
}

export default Login;