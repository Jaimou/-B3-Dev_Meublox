
export function usePostNewUser(form) {


    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: form.email,  password: form.password})
    };
    fetch('requete api post order', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ orderId: data.id }));

    console.log(response)
}