import ObjectsList from '../objectsList/ObjectsList';
import './Products.scss';
import data from '../../lib/data/dataTest.jsx'

const Products = () => {


    const allData = data;

    return (
        <div className='page'>
            <h3><a href='/'>Home</a></h3>
            <h1>Tous les Produits</h1>
            <div className='trait'></div>
            <div className='all-products-page'>
                <ObjectsList allData={allData} />
            </div>
        </div>
    )
}

export default Products;