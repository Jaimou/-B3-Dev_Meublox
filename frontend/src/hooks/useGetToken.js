import { useState, useEffect } from 'react';

export function useGetToken() {

    const [token, setToken] = useState(null)

    // useEffect(
    //     ()=> {
    //         const currentToken = request.headers.authorization.split(" ");
    //         console.log(currentToken[1])
    //         setToken(currentToken[1])
    //     }, []
    // )

    return token
}