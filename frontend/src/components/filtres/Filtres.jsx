import { useState } from "react";
import FiltreCouleur from "./FiltreCouleur";
import FiltrePrix from "./FiltrePrix";
import FiltreTri from "./FiltreTri";

const Filtres = (props) => {

    const data = props.data;
    const setData = props.setData

    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()
    const [color, setColor] = useState('')
    const [tri, setTri] = useState()
    const [initialMinPrice, setInitialMinPrice] = useState()
    const [initialMaxPrice, setInitialMaxPrice] = useState()


    const filtrerPage = () => {
        if (maxPrice > initialMaxPrice) {
            setMaxPrice(initialMaxPrice)
        }
        if (minPrice < initialMinPrice) {
            setMinPrice(initialMinPrice)
        }


        if (color != "" && color != "undefined") {
            let filteredData = data.filter(function (product) {
                return product.couleurs.includes(color) && product.prix >= minPrice && product.prix <= maxPrice
            });
            triFunction(filteredData)
            return filteredData
        }
        else {
            let filteredData = data.filter(function (product) {
                return product.prix >= minPrice && product.prix <= maxPrice
            });
            triFunction(filteredData)
            return filteredData
        }

    }

    const triFunction = (filteredData) => {
        if (tri == "nom") {
            filteredData.sort(function (a, b) {
                return a.nom - b.nom;
            });
        }
        if (tri == "croissant") {
            filteredData.sort(function (a, b) {
                return a.prix - b.prix;
            });
        }
        if (tri == "decroissant") {
            filteredData.sort(function (a, b) {
                return b.prix - a.prix;
            });
        }
        if (tri == "note") {
            filteredData.sort(function (a, b) {
                return b.note - a.note;
            });
        }
        setData(filteredData)
    }


    return (
        <div className="filtres">
            <div className="filtrage">
                <FiltrePrix data={data}
                    minPrice={minPrice} setMinPrice={setMinPrice}
                    maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                    initialMinPrice={initialMinPrice} setInitialMinPrice={setInitialMinPrice}
                    initialMaxPrice={initialMaxPrice} setInitialMaxPrice={setInitialMaxPrice}
                />
                <FiltreCouleur data={data} color={color} setColor={setColor} />
                <FiltreTri setTri={setTri} />
                <button id="button-tri" type="submit" onClick={filtrerPage}>Filtrer</button>
            </div>
        </div>
    )
}
export default Filtres;