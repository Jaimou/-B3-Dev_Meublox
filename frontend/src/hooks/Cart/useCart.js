import { useState, useEffect } from 'react';

export function useCart(newProduct) {

    const [cart, setCart] = useState(null);
   
    const updateCart = () => {
        let newCart = cart;

        if (newCart == null) {
            newCart = [];
            newCart.push(newProduct);
            setCart(newCart);
        }
        else {

            if (newCart.some(product => product.id === newProduct.id)) {
                product = cart.find(product => product.id === newProduct.id)
                product.productQuantity += quantity;

                if (newProduct.productQuantity > 10) {
                    newProduct.productQuantity = 10;
                }
                setCart(newCart);

            }

            else {
                newCart.push(newProduct);
                setCart(newCart);
            }
        }
    };

    useEffect(
        ()=> {
            if(newProduct==null){
                return
            }
            else{
            updateCart()}
        }, []
    )

    return cart
}

export function useCartQuantity() {
    
    const [cartProducts, setCartProducts] = useState();

    const cart = useCart()

    useEffect(() => {
        console.log(cart)
        if (cart == null) {
            setCartProducts(0)
        }
        else {
            setCartProducts(cart.length)
        }
    })

    return cartProducts
}