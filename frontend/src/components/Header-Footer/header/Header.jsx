import './Header.scss';
import logo from './meubloxLogo.svg';
import Searchbar from './searchbar/Searchbar';

const Header = () => {
    return (
        <header>
            <img alt='logo' src={logo}></img>
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