import './SideNav.scss';

export default function SideNav(props) {

    let profil = props.profil

    return (
        <>
            <div id="sidebar">
                <h1>{profil.firstname + ' ' + profil.lastname}</h1>
                <nav>
                    <ul>
                        <li>
                            <p id="profil">Profil</p>
                        </li>
                        <li>
                            <p id="commandes">Vos Commandes</p>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"></div>
        </>
    );
}