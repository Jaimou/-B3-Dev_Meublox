import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
    return (
        <footer>
            <p>Copyright © 2023</p>
            <div className='legal'>
                <a href="/legal">Mentions légales</a>
                <p>|</p>
                <Link to="/contact">Contact</Link>
            </div>
        </footer>
    );
}

export default Footer;