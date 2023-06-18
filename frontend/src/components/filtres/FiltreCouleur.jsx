import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import './Filtres.scss';

const FiltreCouleur = (props) => {

    const data = props.data
    const color = props.color
    const setColor = props.setColor

    const [objectColors, setObjectColors] = useState([{ value: '', label: 'Aucune Sélection' }]);
    const [objectColor, setObjectColor] = useState('');


    useEffect(() => {
        let allObjectsColor = [];
        let finalObjectsColor = [{ value: '', label: 'Aucune Sélection' }];
        data.map((product) => {
            product.couleurs.map((couleur) => {
                if (allObjectsColor.includes(couleur)) {
                    return allObjectsColor;
                }
                allObjectsColor.push(couleur)
                finalObjectsColor.push({ value: couleur, label: couleur })
                setObjectColors(finalObjectsColor)
                return allObjectsColor;
            })
        })
    }, [data])


    return (
        <div className="filtre">
            <div className="colorChoice">
                <h3>Coloris</h3>
                <ReactSelect id="colors" defaultValue={objectColors[0]} options={objectColors} onChange={((e) => {
                    setColor(e.value);
                })} />
            </div>
        </div>
    );
}

export default FiltreCouleur;