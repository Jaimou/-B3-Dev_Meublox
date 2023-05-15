import { useState, useEffect } from 'react';

export function useConnect(bearer) {

    const [token, setToken] = useState(null)

    useEffect(
        ()=> {
            setToken(bearer)
        }, []
    )

}