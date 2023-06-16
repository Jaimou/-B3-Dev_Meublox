import { useEffect, useState } from 'react';

export function useUserStatus() {
    const [log, setlog] = useState(false)


    
        const token = sessionStorage.getItem("token")
    
    
        if (token == null || token == "undefined"){
            setlog(false)
        }

        else {
            setlog(true)
        }
    

   

    return log
}