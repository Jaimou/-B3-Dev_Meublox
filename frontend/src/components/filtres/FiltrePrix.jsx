import { useState } from "react";
import Object from "../Object/Object";
import './Filtres.scss';

const FiltrePrix = (props) => {

    const data = props.data

    const [objectPrice, setObjectPrice] = useState(40);

    const handleInput = (e) => {
        setObjectPrice(e.target.value);
    }

    const getMinPriceProduct = () => {
        let minPrice = 1000000000;

        data.map((product) => {
            if (product.Price < minPrice) {
                minPrice = product.Price;
            }

            return minPrice;
        })

        return minPrice;
    }

    const getMaxPriceProduct = () => {
        let maxPrice = 0;

        data.map((product) => {
            if (product.Price > maxPrice) {
                maxPrice = product.Price;
            }

            return maxPrice;
        })

        return maxPrice;
    }

    const getMin = getMinPriceProduct();
    const getMax = getMaxPriceProduct();

    return (
        <div className="filtre">
            <div className="range">
                <p>{getMin}</p>
                <input type="range" min={getMin} max={getMax} onInput={handleInput} />
                <p>{getMax}</p>
            </div>
            <h2>Price: {objectPrice}</h2>
            {/* <div className="objects-list">
                {data.filter(object => { return object.Price >= parseInt(objectPrice, 10) }).map(object => {
                    return (

                        <Object object={object} />
                    )
                })}
            </div> */}
        </div>
    );
}

export default FiltrePrix;