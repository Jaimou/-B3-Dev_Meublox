import { useState, useEffect } from 'react';
import { useGetToken } from '../useGetToken';

export function useGetCart(log) {

    const [cart, setCart] = useState();
    const token = useGetToken()
    

    // GET METHOD
    const requestGetOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({message:"test"})
    };

    const getCart = async() => {
        if (log) {
            try{
                const response = await fetch("/adresse html de l'api", requestGetOptions);
                const responseInJSON = await response.json();
                setCart(responseInJSON)
            }
            catch(error) {
                return [];
            }
        }
        else {
            return
        }
    }

    
    useEffect(
        ()=> {
            getCart()
        }, []
    )

    return cart
}