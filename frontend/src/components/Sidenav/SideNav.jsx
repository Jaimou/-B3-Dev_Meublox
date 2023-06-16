import { useNavigate } from 'react-router-dom';
import './SideNav.scss';

export default function SideNav(props) {

    let profil = props.profil;
    let myOrders = props.myOrders;
    let setMyOrders = props.setMyOrders;
    let myInfos = props.myInfos;
    let setMyInfos = props.setMyInfos;
    let changePassword = props.changePassword;
    let setChangePassword = props.setChangePassword;
    let myCards = props.myCards;
    let setMyCards = props.setMyCards;

    const navigate = useNavigate()


    const logOut = () => {
        // Déconnexion
        console.log("déconnexion")
        sessionStorage.clear()
        navigate("/")
    }
    return (
        <>
            <div className="sidebar" id="sidebar">
                <h1>{profil.prenom}
                    <br></br>
                    {profil.nom}</h1>
                <nav>
                    <ul className='profil-onglet'>
                        <li>
                            <p href='' id="commandes" onClick={() => {
                                setMyOrders(true)
                                setMyInfos(false)
                                setChangePassword(false)
                                setMyCards(false)
                            }}>Mes Commandes</p>
                        </li>
                        <li>
                            <p id="profil" onClick={() => {
                                setMyOrders(false)
                                setMyInfos(true)
                                setChangePassword(false)
                                setMyCards(false)
                            }}>Mes Informations</p>
                        </li>

                        <li>
                            <p id="mdp" onClick={() => {
                                setMyOrders(false)
                                setMyInfos(false)
                                setChangePassword(true)
                                setMyCards(false)
                            }}>Mot de passe</p>
                        </li>
                        <li>
                            <p id="cartes" onClick={() => {
                                setMyOrders(false)
                                setMyInfos(false)
                                setChangePassword(false)
                                setMyCards(true)
                            }}>Mes cartes de Paiement </p>
                        </li>
                        {profil.role == "admin" ?
                            <li>
                                <p id="administration" onClick={() => {
                                    navigate("/profile/administation")
                                }}>Administration</p>
                            </li> :
                            <></>
                        }
                        <li>
                            <p id="deconnexion" onClick={() => {
                                logOut()
                            }}>Se déconnecter</p>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}