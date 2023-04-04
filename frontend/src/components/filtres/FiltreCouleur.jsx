import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import './Filtres.scss';

const FiltreCouleur = (props) => {

    const data = props.data

    const [objectColors, setObjectColors] = useState([{ value: '', label: 'Aucune Sélection' }]);
    const [objectColor, setObjectColor] = useState('');

    const selectColor = (e) => {
        const colorValue = e.value
        console.log(colorValue)
    }

    useEffect(() => {
        let allObjectsColor = [];
        let finalObjectsColor = [];
        data.map((product) => {
            if (allObjectsColor.includes(product.Color)) {
                return allObjectsColor;
            }
            allObjectsColor.push(product.Color)
            finalObjectsColor.push({ value: product.Color, label: product.Color })
            setObjectColors(finalObjectsColor)
            return allObjectsColor;
        })
    }, [data])


    return (
        <div className="filtre">
            <div className="colorChoice">
                <h3>Coloris</h3>
                <ReactSelect id="colors" options={objectColors} onChange={((e) => { selectColor(e) })} />
            </div>
        </div>
    );
}

export default FiltreCouleur;