import { useState } from "react";
import Object from "../Object/Object";
import './Filtres.scss';

const FiltrePrix = (props) => {

    const getMin = props.minFunction;
    const getMax = props.maxFunction;
    const objectsData = props.data

    const [objectPrice, setObjectPrice] = useState(40);

    const handleInput = (e) => {
        setObjectPrice(e.target.value);
    }


    return (
        <div className="filtre">
            <div className="range">
                <p>{getMin}</p>
                <input type="range" min={getMin} max={getMax} onInput={handleInput} />
                <p>{getMax}</p>
            </div>
            <h1>Price: {objectPrice}</h1>
            <div className="objects-list">
                {objectsData.filter(object => { return object.Price >= parseInt(objectPrice, 10) }).map(object => {
                    return (

                        <Object object={object} />
                    )
                })}
            </div>
        </div>
    );
}

export default FiltrePrix;