import ObjectsList from "../objectsList/ObjectsList";
import data from '../../lib/data/dataTest.jsx'
import { useParams } from "react-router-dom";

const Recherche = () => {
    const allData = data
    let { research } = useParams()


    return (
        <div className='page'>
            <h3><a href='/'>Home</a></h3>
            <h1>{research}</h1>
            <div className='trait'></div>
            <div className='all-products-page'>
                <ObjectsList allData={allData} type={research} />
            </div>
        </div>
    )
}

export default Recherche;