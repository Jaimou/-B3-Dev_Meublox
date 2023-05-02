import ReactSelect from "react-select";

const FiltreTri = () => {


    const options = [
        { value: 'A-Z', label: 'ordre alphabétique' },
        { value: 'croissant', label: 'prix croissant' },
        { value: 'decroissant', label: 'prix décroissant' },
        { value: 'rate', label: 'popularité' },
    ]




    return (
        <div className="filtre">
            <div className="tri">
                <h3>Trier par :</h3>
                <ReactSelect id="tri" options={options} />
            </div>
        </div>
    )
}

export default FiltreTri