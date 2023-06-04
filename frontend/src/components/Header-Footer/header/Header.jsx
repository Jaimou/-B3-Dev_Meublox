import './Header.scss';
import logo from './meubloxLogo.svg';
import Searchbar from './searchbar/Searchbar';
import { useUserStatus } from '../../../hooks/useUserStatus';
import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';

const Header = () => {

    const log = useUserStatus()
    const [cartQuantity, setCartQuantity] = useState(0);
    const userToken = sessionStorage.getItem("token")
    const myDecodedToken = decodeToken(userToken);


    // useEffect(() => {
    //     if (log) {
    //         const userId = myDecodedToken.user_id
    //         callAPI(userId)
    //     }
    //     else {
    //         const cart = localStorage.getItem("cart")
    //         if (cart != null) {
    //             setCartQuantity(cart.length)
    //         }
    //     }
    // })


    useEffect(() => {

        const callAPI = async (userId) => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            let response = await fetch(`http://localhost:8000/cart/${userId}`, requestOptions);
            const responseInJSON = await response.json();
            console.log(responseInJSON)
            if (responseInJSON.detail == "Cart not found") {
                setCartQuantity(0)
            }
            else {
                setCartQuantity(responseInJSON.items.length)
            }

        }

        if (log) {
            const userId = myDecodedToken.user_id
            callAPI(userId)
        }
        else {
            const cart = localStorage.getItem("cart")
            if (cart != null) {
                setCartQuantity(cart.length)
            }
        }
    })




    return (
        <header>
            <a href='/'>
                <img alt='logo' src={logo}></img>
            </a>
            <Searchbar />


            <div className="login-profil-cart">
                {log ?
                    <a href="/profile">Profil</a>
                    :
                    <a href="/login" className="login">Se connecter</a>

                }
                <a href="/panier" className="cart">
                    <div className='articles-number'>{cartQuantity}</div>Panier</a>

            </div>
        </header>
    );
}

export default Header;