import { useState } from "react"
import SideNav from "../Sidenav/SideNav"
import "./Profil.scss"
import Commandes from "./Commandes/Commandes"
import Informations from "./Informations/Informations"
import Password from "./Password/Password"
import CartesPaiement from "./CartesPaiement/CartesPaiement"

const Profil = () => {

    const [myOrders, setMyOrders] = useState(true)
    const [myInfos, setMyInfos] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [myCards, setMyCards] = useState(false)
    const [administration, setAdministration] = useState(false)


    let profil = {
        firstname: "John",
        lastname: "Doe",
        age: 28,
        adress: "1 rue Test",
        city: "Testville",
        cp: "01234"
    }



    return (
        <>
            <div className="profile">
                <SideNav profil={profil} myOrders={myOrders} setMyOrders={setMyOrders} myInfos={myInfos} setMyInfos={setMyInfos} myPassword={changePassword} setChangePassword={setChangePassword} myCards={myCards} setMyCards={setMyCards} />
                <div className="profil-views">
                    {myOrders ?
                        <Commandes />
                        :
                        <></>
                    }
                    {myInfos ?
                        <Informations profil={profil} />
                        :
                        <></>
                    }
                    {changePassword ?
                        <Password />
                        :
                        <></>
                    }
                    {myCards ?
                        <CartesPaiement />
                        :
                        <></>
                    }

                </div>


            </div>
        </>
    )
}

export default Profil