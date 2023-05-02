import './SideNav.scss';

export default function SideNavAdmin() {



    return (
        <>
            <div id="sidebar-admin">

                <nav>
                    <ul className='profil-onglet'>
                        <li>
                            <p id="users-gestion">Utilisateurs</p>
                        </li>
                        <li>
                            <p id="products-gestion">Articles</p>
                        </li>

                        <li>
                            <p id="commandes-gestion">Commandes</p>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"></div>
        </>
    );
}