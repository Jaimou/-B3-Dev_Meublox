import { useState } from "react"
import SideNavAdmin from "../Sidenav/SidNavAdmin"
import "./Profil.scss"

const ProfilAdmin = () => {

    const [users, setUsers] = useState(true)
    const [products, setProducts] = useState(false)
    const [orders, setOrders] = useState(false)




    return (
        <>
            <div className="profile" >
                <SideNavAdmin users={users} setUsers={setUsers} products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} />
                <div className="profil-views">

                </div>


            </div>
        </>
    )
}

export default ProfilAdmin