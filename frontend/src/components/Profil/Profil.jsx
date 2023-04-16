import SideNav from "../../routes/SideNav"
import "./Profil.scss"

const Profil = () => {

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
                <SideNav profil={profil} />
                <div className="profil-views">

                </div>


            </div>
        </>
    )
}

export default Profil