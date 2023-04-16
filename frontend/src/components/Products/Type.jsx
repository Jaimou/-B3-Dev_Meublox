import { useParams } from 'react-router-dom';
import ObjectsList from '../objectsList/ObjectsList';
import './Type.scss';
import data from '../../lib/data/dataTest.jsx'

const Type = () => {


    const allData = data
    let { type } = useParams()


    return (
        <div className='page'>
            <h3><a href='/'>Home</a></h3>
            <h1>{type}</h1>
            <div className='trait'></div>
            <div className='all-products-page'>
                <ObjectsList allData={allData} type={type} />
            </div>
        </div>
    )
}

export default Type;