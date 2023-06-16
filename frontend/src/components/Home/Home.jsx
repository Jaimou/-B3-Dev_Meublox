import ObjectsList from '../objectsList/ObjectsList';
import './Home.scss';
import { useEffect, useState } from 'react';


const Home = () => {

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

    return (
        <div className='classic-page'>
            {isLoad ?
                <>
                    <h1>Produits Populaires</h1>
                    <div className='trait'></div>
                    <ObjectsList allData={allData} />
                </> :
                <h2 className='loading'>Loading</h2>
            }
        </div>
    )
}

export default Home;