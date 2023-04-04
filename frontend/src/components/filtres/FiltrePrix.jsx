import { useState } from "react";
import Object from "../Object/Object";
import './Filtres.scss';

const FiltrePrix = (props) => {

    const data = props.data

    const [objectMinPrice, setObjectMinPrice] = useState();
    const [objectMaxPrice, setObjectMaxPrice] = useState();


    const minPrice = (e) => {
        setObjectMinPrice(e.target.value);
    }

    const maxPrice = (e) => {
        setObjectMaxPrice(e.target.value);
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
                <div className="range-value">
                    <h3>min</h3>
                    <input className="filtre-input" id="min" type="text" defaultValue={getMin} placeholder={getMin} onInput={((e) => { minPrice(e) })} />
                </div>
                <div className="range-value">
                    <h3>max</h3>
                    <input className="filtre-input" id="max" type="text" defaultValue={getMax} placeholder={getMax} onInput={((e) => { maxPrice(e) })} />
                </div>
            </div>
        </div>
    );
}

export default FiltrePrix;