import { useState, useEffect } from 'react';

export function useGetAllFilteredProductsData(filters) {

    const [allFilteredProductsData, setAllFilteredProductsData] = useState();

    const callAPI = async() => {
        try{
            const response = await fetch("/adresse html de l'api");
            const responseInJSON = await response.json();
            setAllFilteredProductsData(responseInJSON)
        }catch(error) {
            return [];
        }
    }

    useEffect(
        ()=> {
            callAPI()
        }, []
    )
    return allFilteredProductsData
}