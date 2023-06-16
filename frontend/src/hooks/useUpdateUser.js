
export function useUpdateUser(form, userId) {

    const token = sessionStorage.getItem("token")

    const requestOptions = {
        method: 'PUT',
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
    fetch(`http://localhost/users/${userId}`, requestOptions)
        .then(response => response.json())
        .then(data => this.setState({ userId: data.id }));

}