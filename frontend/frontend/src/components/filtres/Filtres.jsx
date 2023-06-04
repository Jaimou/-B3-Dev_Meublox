import FiltreCouleur from "./FiltreCouleur";
import FiltrePrix from "./FiltrePrix";
import FiltreTri from "./FiltreTri";

const Filtres = (props) => {

    const data = props.data;


    const filtrerPage = () => {
        const minPrice = document.getElementById('min').value;
        const maxPrice = document.getElementById('max').value;
        const colors = document.getElementById('colors').value;
        const tri = document.getElementById('tri').value;
    }


    return (
        <div className="filtres">
            <div className="filtrage">
                <FiltrePrix data={data} />
                <FiltreCouleur data={data} />
                <FiltreTri />
                <button id="button-tri" type="submit" onClick={filtrerPage}>Filtrer</button>
            </div>
        </div>
    )
}
export default Filtres;