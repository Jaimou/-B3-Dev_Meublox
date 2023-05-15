import { useState, useEffect } from 'react';

export function useGetAllProductsData() {

    const [allProductsData, setAllProductsData] = useState();

    const callAPI = async() => {
        try{
            const response = await fetch("/adresse html de l'api");
            const responseInJSON = await response.json();
            setAllProductsData(responseInJSON)
        }catch(error) {
            return [];
        }
    }

    useEffect(
        ()=> {
            callAPI()
        }, []
    )
}