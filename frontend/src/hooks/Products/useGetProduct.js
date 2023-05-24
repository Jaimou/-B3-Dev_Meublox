import { useState } from 'react';
import data from '../../lib/data/dataTest.jsx'

export function useGetProduct(productId) {

        const allData = data

    const thisProduct = allData.find((product) => {
        return product.id == productId
    })

    const [findProduct, setFindProduct] = useState(thisProduct);


    const callAPI = async() => {
        // try{
        //     const response = await fetch("/adresse html de l'api");
        //     const responseInJSON = await response.json();
        //     setProduct(responseInJSON)
        // }catch(error) {
        //     return {};
        // }
           }

    return findProduct
}