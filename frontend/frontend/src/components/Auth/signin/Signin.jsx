import './Signin.scss';

const Signin = () => {

    return (
        <div className='signin-page'>
            <h1>Inscription</h1>
            <div className='trait'></div>
            <div className="signin-block">
                <h2>Sign in</h2>
                <input id="email" className="form" typeof="text" aria-label="email" placeholder="email"></input>
                <input id="password" className="form" typeof="password" aria-label="password" placeholder="password"></input>
                <input id="password-verify" className="form" typeof="password" aria-label="taper de nouveau le password" placeholder="taper de nouveau le password"></input>
                <div className='remember-validation'>
                    <div className='remember'>
                        <input type="checkbox" id="remember" name="remember" />
                        <label for="remember">Remember me !</label>
                    </div>
                    <button className='validation' type='submit'>Login</button>
                </div>
                <div className='trait inside'></div>
                <button className='validation' type='submit'>S'enregistrer avec Facebook</button>
                <button className='validation' type='submit'>S'enregister avec Google</button>
                <p>J'ai déjà un compte ? <br />
                    <a href='/login'>Je me connecte</a>
                </p>

            </div>
        </div>
    );
}

export default Signin;