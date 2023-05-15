import { useState, useEffect } from 'react';

export function useGetProduct() {

    const [product, setProduct] = useState();

    const callAPI = async() => {
        try{
            const response = await fetch("/adresse html de l'api");
            const responseInJSON = await response.json();
            setProduct(responseInJSON)
        }catch(error) {
            return {};
        }
    }

    useEffect(
        ()=> {
            callAPI()
        }, []
    )
    return product
}