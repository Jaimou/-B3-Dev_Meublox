import './Header.scss';
import logo from './meubloxLogo.svg';
import Searchbar from './searchbar/Searchbar';
import { useUserStatus } from '../../../hooks/useUserStatus';
import { useCartQuantity } from '../../../hooks/Cart/useCartQuantity';

const Header = () => {

    //const log = useUserStatus()
    const log = false;
    const cartQuantity = useCartQuantity(log);


    //let currentCart = JSON.parse(localStorage.getItem("cart"));

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