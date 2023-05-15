import { useState, useEffect } from 'react';

export function useGetProfile() {

    const [profileData, setProfileData] = useState();

    const callAPI = async() => {
        try{
            const response = await fetch("/adresse html de l'api");
            const responseInJSON = await response.json();
            setProfileData(responseInJSON)
        }catch(error) {
            return [];
        }
    }

    useEffect(
        ()=> {
            callAPI()
        }, []
    )
}

