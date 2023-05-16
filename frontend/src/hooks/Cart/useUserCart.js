import { useState, useEffect } from 'react';
import { useGetToken } from '../useGetToken';

export function useUserCart(newProduct) {

    const [userCart, setUserCart] = useState();
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

    const getUserCart = async() => {
        try{
            const response = await fetch("/adresse html de l'api", requestGetOptions);
            const responseInJSON = await response.json();
            setUserCart(responseInJSON)
        }catch(error) {
            return [];
        }
    }


    //PATCH METHOD
    const updateUserCart = async() => {
        let newCart = userCart;

        if (newCart == null) {
            newCart = [];
            newCart.push(newProduct);
            setUserCart(newCart);
        }
        else {

            if (newCart.some(product => product.id === newProduct.id)) {
                product = newCart.find(product => product.id === newProduct.id)
                product.productQuantity += quantity;

                if (newProduct.productQuantity > 10) {
                    newProduct.productQuantity = 10;
                }
                setUserCart(newCart);

            }

            else {
                newCart.push(newProduct);
                setUserCart(newCart);
            }
        }

        const requestPatchOptions = {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userCart)
        };

        try{
            const response = await fetch("/adresse html de l'api", requestPatchOptions);
            const responseInJSON = await response.json();
            setUserCart(responseInJSON)
        }catch(error) {
            return [];
        }
    };

    useEffect(
        ()=> {
            if(newProduct==null){
                getUserCart()
            }
            else{
                updateUserCart()
            }
        }, []
    )

    return userCart
}

export function useUserCartQuantity() {
    
    const [userCartProducts, setuserCartProducts] = useState();

    const userCart = useUserCart()

    useEffect(() => {
        console.log(userCart)
        if (userCart == null) {
            setuserCartProducts(0)
        }
        else {
            setuserCartProducts(userCart.length)
        }
    })

    return userCartProducts
}
