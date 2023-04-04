import './Login.scss';

const Login = () => {

    return (
        <div className='login-page'>
            <h1>Authentification</h1>
            <div className='trait'></div>
            <div className="login-block">
                <h2>Login</h2>
                <input id="email" className="form" typeof="text" aria-label="email" placeholder="email"></input>
                <input id="password" className="form" typeof="password" aria-label="password" placeholder="password"></input>
                <div className='remember-validation'>
                    <div className='remember'>
                        <input type="checkbox" id="remember" name="remember" />
                        <label for="remember">Remember me !</label>
                    </div>
                    <button className='validation' type='submit'>Login</button>
                </div>
                <div className='trait inside'></div>
                <button className='validation' type='submit'>Se connecter avec Facebook</button>
                <button className='validation' type='submit'>Se connecter avec Google</button>
                <p>Je n'ai pas de compte ? <br />
                    <a href='/signin'>Je m'inscris</a>
                </p>

            </div>
        </div>
    );
}

export default Login;