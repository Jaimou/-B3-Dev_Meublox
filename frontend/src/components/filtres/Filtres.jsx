import FiltreAlphabetique from "./FiltreAlphabetique";
import FiltreCouleur from "./FiltreCouleur";
import FiltrePrix from "./FiltrePrix";

const Filtres = (props) => {

    const data = props.data;

    console.log("Filtres - data");
    console.log(data)


    return (
        <div className="filtres">
            <FiltrePrix data={data} />
            <FiltreCouleur data={data} />
            <FiltreAlphabetique data={data} />
        </div>
    )
}
export default Filtres;