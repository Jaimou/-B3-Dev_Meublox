import SideNav from "../../routes/SideNav"

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


            </div>
        </>
    )
}

export default Profil