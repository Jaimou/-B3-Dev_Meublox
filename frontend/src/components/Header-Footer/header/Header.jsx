import './Header.scss';
import logo from '../../../lib/meubloxLogo.svg';
import Searchbar from './searchbar/Searchbar';
import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';

const Header = () => {

    const [log, setlog] = useState(false)
    const [cartQuantity, setCartQuantity] = useState(0);
    const userToken = sessionStorage.getItem("token")
    const myDecodedToken = decodeToken(userToken);
    const [currentWindowLocation, setCurrentWindowLocation] = useState("")

    const userStatus = () => {

        if (myDecodedToken == null || myDecodedToken == "undefined") {
            setlog(false)
        }

        else {
            setlog(true)
        }
    }


    const verifyWindow = () => {

        if (currentWindowLocation == window.location.href) {
            return
        }
        else {
            userStatus()
            setCurrentWindowLocation(window.location.href)
        }
    }


    useEffect(() => {


        const callAPI = async (userId) => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            let response = await fetch(`http://localhost:8000/cart/${userId}`, requestOptions);
            const responseInJSON = await response.json();
            if (responseInJSON == ["Cart not found"]) {
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


    verifyWindow()

    return (
        <header>
            <a className='img-link' href='/'>
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