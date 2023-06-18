import { useEffect, useState } from "react"
import SideNavAdmin from "../Sidenav/SidNavAdmin"
import "./Profil.scss"
import { decodeToken } from "react-jwt"
import CommandesAdmin from "./Commandes/CommandesAdmin"
import Users from "./Users/Users"
import ProductsAdmin from "./Products/ProductsAdmin"

const ProfilAdmin = () => {

    const [users, setUsers] = useState(true)
    const [products, setProducts] = useState(false)
    const [orders, setOrders] = useState(false)
    const [isLoad, setIsLoad] = useState(false)

    const userToken = sessionStorage.getItem("token")
    const myDecodedToken = decodeToken(userToken);
    const userId = myDecodedToken.user_id


    const [usersList, setUsersList] = useState([])
    const [ordersList, setOrdersList] = useState([])
    const [productsList, setProductsList] = useState([])



    const getUsersList = async () => {

        let request = await fetch(`http://localhost:8000/users`, {
            method: 'GET',
        })
        let response = await request.json();
        setUsersList(response)
    }

    const getProductsList = async () => {

        let request = await fetch(`http://localhost:8000/products`, {
            method: 'GET',
        })
        let response = await request.json();
        setProductsList(response)
    }


    const getOrdersList = async () => {

        let request = await fetch("http://localhost:8000/orders", {
            method: 'GET',
        })
        let response = await request.json();
        setOrdersList(response)
    }


    const callApi = async () => {
        await getUsersList()
        await getProductsList()
        await getOrdersList()
        setIsLoad(true)
    }

    useEffect(() => {
        callApi()
    }, [])


    return (
        <>
            <div className="profile" >
                {isLoad ?
                    <>
                        <SideNavAdmin users={users} setUsers={setUsers} products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} />
                        <div className="profil-views">
                            <>
                                <h3><a href="/profile">Retour</a></h3>
                                {users ?
                                    <Users users={usersList} />
                                    :
                                    <></>
                                }
                                {products ?
                                    <ProductsAdmin products={productsList} />
                                    :
                                    <></>
                                }
                                {orders ?
                                    <CommandesAdmin orders={ordersList} />
                                    :
                                    <></>
                                }
                            </>
                        </div>
                    </> :
                    <h2 className='loading'>Loading</h2>
                }


            </div>
        </>
    )
}

export default ProfilAdmin