import { useConnect } from "./useGetToken";

export function usePostProduct(form) {

    const token = useConnect()

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
            name: form.name,  
            galery: form.gallery,
            stock: form.stock,
            price: form.price,
            shortDescription: form.shortDescription,
            longDescription: form.longDescription,
            rate: 0,
            raters: [],
        })
    };
    fetch('requete api post order', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ orderId: data.id }));

    console.log(response)
}