import './SideNav.scss';

export default function SideNav(props) {

    let profil = props.profil

    return (
        <>
            <div id="sidebar">
                <h1>{profil.firstname + ' ' + profil.lastname}</h1>
                <nav>
                    <ul className='profil-onglet'>
                        <li>
                            <p id="commandes">Mes Commandes</p>
                        </li>
                        <li>
                            <p id="profil">Mes Informations</p>
                        </li>

                        <li>
                            <p id="mdp">Mot de passe</p>
                        </li>
                        <li>
                            <p id="cartes">Mes cartes de Paiement</p>
                        </li>
                        <li>
                            <p id="administration">Administration</p>
                        </li>
                        <li>
                            <p id="deconnexion">Se déconnecter</p>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"></div>
        </>
    );
}