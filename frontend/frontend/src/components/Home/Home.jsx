import ObjectsList from '../objectsList/ObjectsList';
import './Home.scss';
import data from '../../lib/data/dataTest.jsx'
import { useEffect } from 'react';


const Home = () => {

    const allData = data;
    const popularData = data



    return (
        <div className='classic-page'>
            <h1>Produits Populaires</h1>
            <div className='trait'></div>
            <ObjectsList allData={allData} />
        </div>
    )
}

export default Home;