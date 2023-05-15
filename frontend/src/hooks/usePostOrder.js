import { useConnect } from "./useGetToken";

export function usePostOrder(cart) {
    const token = useConnect()

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ cart: cart})
    };
    fetch('requete api post products', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ postId: data.id }));
}