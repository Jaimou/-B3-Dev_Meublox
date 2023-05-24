import { useState, useEffect } from 'react';
import { useGetCart } from './useGetCart';

export function useCartQuantity(log) {
    
    const [cartProducts, setCartProducts] = useState();

    const cart = useGetCart(log)

    useEffect(() => {
        if (cart == null) {
            setCartProducts(0)
        }
        else {
            setCartProducts(cart.length)
        }
    })

    return cartProducts
}