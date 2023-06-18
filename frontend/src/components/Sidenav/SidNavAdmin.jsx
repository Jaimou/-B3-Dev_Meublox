import './SideNav.scss';

const SideNavAdmin = (props) => {

    let users = props.ursers;
    let setUsers = props.setUsers;
    let products = props.products;
    let setProducts = props.setProducts;
    let orders = props.orders;
    let setOrders = props.setOrders;



    return (
        <>
            <div className='sidebar' id="sidebar-admin">

                <nav>
                    <ul className='profil-onglet'>
                        <li>
                            <p id="users-gestion" onClick={
                                () => {
                                    setUsers(true);
                                    setProducts(false);
                                    setOrders(false);
                                }}>Utilisateurs</p>
                        </li>
                        <li>
                            <p id="products-gestion" onClick={
                                () => {
                                    setUsers(false);
                                    setProducts(true);
                                    setOrders(false);
                                }}>Articles</p>
                        </li>

                        <li>
                            <p id="commandes-gestion" onClick={
                                () => {
                                    setUsers(false);
                                    setProducts(false);
                                    setOrders(true);
                                }}>Commandes</p>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"></div>
        </>
    );
}

export default SideNavAdmin