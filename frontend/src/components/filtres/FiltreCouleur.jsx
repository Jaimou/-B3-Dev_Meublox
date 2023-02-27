import { useState } from "react";
import Object from "../Object/Object";
import './Filtres.scss';

const FiltreCouleur = (props) => {

    const data = props.data

    const [objectColor, setObjectColor] = useState(40);


    const handleInput = (e) => {
        setObjectColor(e.target.value);
    }

    const getAllColors = () => {
        let allObjectsColor = [];
        data.map((product) => {
            if (allObjectsColor.includes(product.Color)) {
                return allObjectsColor;
            }
            allObjectsColor.push(product.Color)
            return allObjectsColor;
        })

        return allObjectsColor;
    }


    const allObjectsColor = getAllColors();
    console.log("allObjectsColor");
    console.log(allObjectsColor);

    return (
        <div className="filtre">
            <div className="colorChoice">
                {allObjectsColor.map(color => {
                    return (
                        <div className="colorSelector">
                            <input type="checkbox" value={color} onInput={handleInput} />
                            <p>{color}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default FiltreCouleur;