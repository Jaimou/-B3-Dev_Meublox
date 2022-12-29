import './Header.scss';
import logo from '../header/meubloxLogo.svg';
import Searchbar from '../searchbar/Searchbar';

const Header = () => {
    return (
        <header>
            <img alt='logo' src={logo}></img>
            <Searchbar />
            {/* <div className="searchbar">SEARCHBAR</div> */}
            <div className="login-profil-cart">
                <a href="/login" className="login">Login</a>
                <a href="/profil">Profil</a>
                <a href="/cart" className="cart">Panier</a>
            </div>
        </header>
    );
}

export default Header;