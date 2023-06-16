import ReactSelect from "react-select";

const FiltreTri = (props) => {

    const setTri = props.setTri



    const options = [
        { value: 'nom', label: 'ordre alphabétique' },
        { value: 'croissant', label: 'prix croissant' },
        { value: 'decroissant', label: 'prix décroissant' },
        { value: 'note', label: 'popularité' },
    ]




    return (
        <div className="filtre">
            <div className="tri">
                <h3>Trier par :</h3>
                <ReactSelect id="tri" options={options} onChange={(e) => { setTri(e.value) }} />
            </div>
        </div>
    )
}

export default FiltreTri