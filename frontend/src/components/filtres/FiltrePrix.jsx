import { useEffect, useState } from "react";
import './Filtres.scss';

const FiltrePrix = (props) => {

    const data = props.data
    const minPrice = props.minPrice
    const initialMinPrice = props.initialMinPrice
    const setInitialMinPrice = props.setInitialMinPrice
    const initialMaxPrice = props.initialMaxPrice
    const setInitialMaxPrice = props.setInitialMaxPrice




    const setMinPrice = props.setMinPrice
    const maxPrice = props.maxPrice
    const setMaxPrice = props.setMaxPrice


    const getMinPriceProduct = () => {
        let price = 10000;

        data.map((product) => {
            if (product.prix < price) {
                price = product.prix;
            }
            return price;
        })

        setInitialMinPrice(price)
        setMinPrice(price)

    }

    const getMaxPriceProduct = () => {
        let maximalPrice = 0;

        data.map((product) => {
            if (product.prix > maximalPrice) {
                maximalPrice = product.prix;
            }

            return maximalPrice;
        })

        setInitialMaxPrice(maximalPrice);
        setMaxPrice(maximalPrice);

    }


    const handleMinPriceChange = (e) => {

        setMinPrice(Number(e.target.value))
    }

    const handleMaxPriceChange = (e) => {

        setMaxPrice(Number(e.target.value))
    }


    useEffect(() => {
        getMinPriceProduct()
        getMaxPriceProduct()
    }, [])


    return (
        <div className="filtre">
            <div className="range">
                <div className="range-value">
                    <h3>min</h3>
                    <input className="filtre-input" id="min" type="text" defaultValue={initialMinPrice} placeholder={initialMinPrice} onChange={((e) => { handleMinPriceChange(e) })} />
                </div>
                <div className="range-value">
                    <h3>max</h3>
                    <input className="filtre-input" id="max" type="text" defaultValue={initialMaxPrice} placeholder={initialMinPrice} onChange={((e) => { handleMaxPriceChange(e) })} />
                </div>
            </div>
        </div>
    );
}

export default FiltrePrix;