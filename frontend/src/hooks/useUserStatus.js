import { useState } from 'react';

export function useUserStatus(token) {

    const [log, setlog] = useState(false)

    if (token == 1){
        setlog(true)
    }
    else {
        setlog(false)
    }

}