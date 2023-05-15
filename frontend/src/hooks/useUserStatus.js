import { useState } from 'react';
import { useGetToken } from './useGetToken';

export function useUserStatus() {

    const token = useGetToken();

    const [log, setlog] = useState(false)

    if (token != null){
        setlog(true)
    }
    else {
        setlog(false)
    }

    return log
}