import { PDFViewer } from '@react-pdf/renderer';
import Facture from './Facture';
import "./Facture.scss"
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


const FactureRender = () => {

    const { orderId } = useParams()
    const [order, setOrder] = useState()
    const [isLoad, setIsLoad] = useState(false)
    const [allData, setAllData] = useState([])
    const [deliveryAddress, setDeliveryAddress] = useState([])


    let userCart = []


    const getOrdersById = async () => {

        await dataCall()

        let request = await fetch(`http://localhost:8000/orders/${orderId}`, {
            method: 'GET',
        })
        let orderById = await request.json();
        setOrder(orderById)
        setIsLoad(true)
        setDeliveryAddress(JSON.parse(orderById.delivery_address))

    }

    const dataCall = async (requestOptions) => {

        let responseData = await fetch("http://localhost:8000/products", requestOptions);
        const responseDataInJSON = await responseData.json();
        setAllData(responseDataInJSON)

    }

    const createCart = () => {
        if (isLoad) {
            order.details.forEach((product) => {
                let userProduct = allData.find((dbProduct) => {
                    return product.product_id == dbProduct._id
                })
                let finalUserProduct = { id: userProduct._id, nom: userProduct.nom, image: userProduct.images[0], prix: userProduct.prix, quantity: product.quantity, description: userProduct.short_description }
                userCart.push(finalUserProduct)
            }
            );
        }
    }

    useEffect(() => {
        getOrdersById()
    }, [])

    createCart()

    return (
        <>
            {isLoad ?
                <>  <PDFViewer className='pdf-viewer'>
                    <Facture order={order} userCart={userCart} deliveryAddress={deliveryAddress} />
                </PDFViewer>
                </> :
                <></>}
        </>


    )
}

export default FactureRender;

