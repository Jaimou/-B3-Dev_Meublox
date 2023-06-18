import { useParams } from 'react-router-dom';
import ObjectsList from '../objectsList/ObjectsList';
import './Type.scss';
import { useEffect, useState } from 'react';

const Type = () => {
    const [allData, setAllData] = useState([])
    const [isLoad, setIsLoad] = useState(false)


    useEffect(() => {

        const callAPI = async () => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            let response = await fetch("http://localhost:8000/products", requestOptions);
            const responseInJSON = await response.json();
            setAllData(responseInJSON)
            setIsLoad(true)
        }

        callAPI()
    }, [])


    let { type } = useParams()


    return (
        <div className='page'>
            {isLoad ?
                <>
                    <h3><a href='/'>Home</a></h3>
                    <h1>{type}</h1>
                    <div className='trait'></div>
                    <div className='all-products-page'>
                        <ObjectsList allData={allData} type={type} />
                    </div>
                </>
                :
                <h2 className='loading'>Loading</h2>
            }
        </div>
    )
}

export default Type;