import './Header.scss';
import logo from './meubloxLogo.svg';
import Searchbar from './searchbar/Searchbar';

const Header = () => {
    return (
        <header>
            <a href='/'>
                <img alt='logo' src={logo}></img>
            </a>
            <Searchbar />
            <div className="login-profil-cart">
                <a href="/login" className="login">Se connecter</a>
                {/* <a href="/profil">Profil</a> */}
                <a href="/cart" className="cart">
                    <div className='articles-number'>0</div>Panier</a>
            </div>
        </header>
    );
}

export default Header;