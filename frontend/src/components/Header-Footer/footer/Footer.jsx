import './Footer.scss';

const Footer = () => {
    return (
        <footer>
            <p>Copyright © 2023</p>
            <div className='legal'>
                <a href="/legal">Mentions légales</a>
                <p>|</p>
                <a href="contact">Contact</a>
            </div>
        </footer>
    );
}

export default Footer;