import { useConnect } from "./useGetToken";

export function useUpdateUser(form) {

    const token = useConnect()

    const requestOptions = {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify({ 
            email: form.email,
            civilite:form.civilite,
            password: form.password,
            firstName:form.firstName, 
            lastName:form.lastName, 
            adress:form.adress,
            city:form.city,
            zipCode: form.zipCode,
            role:form.role
        })
    };
    fetch('requete api post order', requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ userId: data.id }));

    console.log(response)
}