import { useNavigate, useParams } from 'react-router-dom';
import '../login/Login.scss';
import { useState } from 'react';

const NewPassword = () => {

    const [password, setPassword] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');

    const params = useParams()


    const handleChangePassword = () => {
        let input = document.getElementById('password')
        setPassword(input.value)
    }

    const handleChangePasswordTwo = () => {
        let inputtwo = document.getElementById('passwordtwo')
        setPasswordTwo(inputtwo.value)
    }

    const handleSendEmail = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: password
            })
        };
        if (password == passwordTwo) {
            fetch(`http://localhost:8000/users/${params.user_id}`, requestOptions)
                .then(response => {
                    response.json();
                    navigate('/login')
                })
        }
        else {
            return
        }
    }


    const navigate = useNavigate()


    return (
        <div className='login-page'>
            <h1>Authentification</h1>
            <div className='trait'></div>
            <div className="login-block">
                <h2>Mot de passe oublié</h2>
                <input id="password" className="form" type="password" value={password} aria-label="password" placeholder="nouveau mot de passe" onChange={handleChangePassword}></input>
                <input id="passwordtwo" className="form" type="password" value={passwordTwo} aria-label="passwordtwo" placeholder="retapez votre nouveau mot de passe" onChange={handleChangePasswordTwo}></input>

                <button className='validation' type='button' onClick={() => {
                    handleSendEmail();
                }}>Changer mon mot de passe</button>
            </div>
        </div>
    );
}

export default NewPassword;