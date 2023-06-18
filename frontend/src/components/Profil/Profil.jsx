import { useEffect, useState } from "react"
import SideNav from "../Sidenav/SideNav"
import "./Profil.scss"
import Commandes from "./Commandes/Commandes"
import Informations from "./Informations/Informations"
import Password from "./Password/Password"
import CartesPaiement from "./CartesPaiement/CartesPaiement"
import { decodeToken } from "react-jwt";


const Profil = () => {

    const [myOrders, setMyOrders] = useState(true)
    const [myInfos, setMyInfos] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [myCards, setMyCards] = useState(false)
    const [profil, setProfil] = useState();
    const [isLoad, setIsLoad] = useState(false)

    const userToken = sessionStorage.getItem("token")
    const myDecodedToken = decodeToken(userToken);


    const callAPI = async () => {
        const userId = myDecodedToken.user_id

        let request = await fetch(`http://localhost:8000/users/${userId}`, {
            method: 'GET',
        })
        let responseProfile = await request.json();
        let user = {
            adresse_postale: responseProfile.adresse_postale,
            civilite: responseProfile.civilite,
            code_postal: responseProfile.code_postal,
            date_naissance: responseProfile.date_naissance,
            email: responseProfile.email,
            nom: responseProfile.nom,
            pays: responseProfile.pays,
            prenom: responseProfile.prenom,
            role: responseProfile.role,
            telephone: responseProfile.telephone,
            ville: responseProfile.ville,
        }
        sessionStorage.setItem("user", JSON.stringify(user));
        setProfil(user)
        setIsLoad(true)
    }

    useEffect(() => {
        callAPI()

    }, [])



    return (
        <>
            <div className="profile">
                {isLoad ?
                    <>
                        <SideNav profil={profil} myOrders={myOrders} setMyOrders={setMyOrders} myInfos={myInfos} setMyInfos={setMyInfos} myPassword={changePassword} setChangePassword={setChangePassword} myCards={myCards} setMyCards={setMyCards} />
                        <div className="profil-views">
                            {myOrders ?
                                <Commandes />
                                :
                                <></>
                            }
                            {myInfos ?
                                <Informations token={userToken} profil={profil} />
                                :
                                <></>
                            }
                            {changePassword ?
                                <Password token={userToken} profil={profil} />
                                :
                                <></>
                            }
                            {myCards ?
                                <CartesPaiement token={userToken} profil={profil} />
                                :
                                <></>
                            }

                        </div>
                    </> :
                    <h2 className='loading'>Loading</h2>
                }


            </div>
        </>
    )
}

export default Profil