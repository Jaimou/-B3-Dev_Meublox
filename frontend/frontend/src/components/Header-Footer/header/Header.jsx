import { useEffect, useState } from 'react';
import './Header.scss';
import logo from './meubloxLogo.svg';
import Searchbar from './searchbar/Searchbar';

const Header = (props) => {

    const login = props.login
    let currentCart = JSON.parse(localStorage.getItem("cart"));


    const [cartProducts, setCartProducts] = useState();
    console.log(cartProducts)

    useEffect(() => {
        console.log(currentCart)
        if (currentCart == null) {
            setCartProducts(0)
        }
        else {
            setCartProducts(currentCart.length)
        }
    })


    return (
        <header>
            <a href='/'>
                <img alt='logo' src={logo}></img>
            </a>
            <Searchbar />
            <div className="login-profil-cart">
                {login ?
                    <a href="/profil">Profil</a> :
                    <a href="/login" className="login">Se connecter</a>

                }
                <a href="/panier" className="cart">
                    <div className='articles-number'>{cartProducts}</div>Panier</a>
            </div>
        </header>
    );
}

export default Header;