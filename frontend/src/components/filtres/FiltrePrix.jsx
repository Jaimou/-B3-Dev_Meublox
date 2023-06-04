import { useEffect, useState } from "react";
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
        let minPrice = 10000;

        data.map((product) => {
            if (product.prix < minPrice) {
                minPrice = product.prix;
            }

            return minPrice;
        })

        setObjectMinPrice(minPrice);
    }

    const getMaxPriceProduct = () => {
        let maxPrice = 0;

        data.map((product) => {
            if (product.prix > maxPrice) {
                maxPrice = product.prix;
            }

            return maxPrice;
        })

        setObjectMaxPrice(maxPrice);
    }

    useEffect(() => {
        getMinPriceProduct()
        getMaxPriceProduct()
    })



    return (
        <div className="filtre">
            <div className="range">
                <div className="range-value">
                    <h3>min</h3>
                    <input className="filtre-input" id="min" type="text" defaultValue={objectMinPrice} placeholder={objectMinPrice} onInput={((e) => { minPrice(e) })} />
                </div>
                <div className="range-value">
                    <h3>max</h3>
                    <input className="filtre-input" id="max" type="text" defaultValue={objectMaxPrice} placeholder={objectMaxPrice} onInput={((e) => { maxPrice(e) })} />
                </div>
            </div>
        </div>
    );
}

export default FiltrePrix;