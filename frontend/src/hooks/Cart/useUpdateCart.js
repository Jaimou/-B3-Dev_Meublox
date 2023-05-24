import { useState, useEffect } from 'react';
import { useGetToken } from '../useGetToken';
import { useUserStatus } from '../useUserStatus';

export function useUpdateCart(newProduct) {

    const [cart, setCart] = useState();
    const token = useGetToken()
    const log = useUserStatus()


    //PATCH METHOD
    const updateCart = async() => {
        let newCart = cart;

        if (newCart == null) {
            newCart = [];
            newCart.push(newProduct);
            setCart(newCart);
        }
        else {

            if (newCart.some(product => product.id === newProduct.id)) {
                let product = newCart.find(product => product.id === newProduct.id)
                product.productQuantity += newProduct.quantity;

                if (product.productQuantity > 10) {
                    product.productQuantity = 10;
                }
                setUserCart(newCart);

            }

            else {
                newCart.push(newProduct);
                setCart(newCart);
            }
        }

        if (log) {

        const requestPatchOptions = {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(cart)
        };

        try{
            const response = await fetch("/adresse html de l'api", requestPatchOptions);
            const responseInJSON = await response.json();
            setCart(responseInJSON)
        }catch(error) {
            return [];
        }
    }
    else {
        setCart(newCart);
    }
    };

    useEffect(
        ()=> {
              updateCart()
        }, [newProduct]
    )

    return cart
}
