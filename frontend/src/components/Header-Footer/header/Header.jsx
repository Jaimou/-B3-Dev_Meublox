import './Header.scss';
import logo from './meubloxLogo.svg';
import Searchbar from './searchbar/Searchbar';
import { useUserStatus } from '../../../hooks/useUserStatus';
import { useUserCartQuantity } from '../../../hooks/Cart/useUserCart';
import { useCartQuantity } from '../../../hooks/Cart/useCart';

const Header = () => {

    const log = useUserStatus()
    const userCartQuantity = useUserCartQuantity()
    const cartQuantity = useCartQuantity()


    //let currentCart = JSON.parse(localStorage.getItem("cart"));

    return (
        <header>
            <a href='/'>
                <img alt='logo' src={logo}></img>
            </a>
            <Searchbar />

            {log ?
                <div className="login-profil-cart">
                    <a href="/profile">Profil</a>
                    <a href="/panier" className="cart">
                        <div className='articles-number'>{userCartQuantity}</div>Panier</a>
                </div>
                :
                <div className="login-profil-cart">
                    <a href="/login" className="login">Se connecter</a>
                    <a href="/panier" className="cart">
                        <div className='articles-number'>{cartQuantity}</div>Panier</a>
                </div>

            }

        </header>
    );
}

export default Header;