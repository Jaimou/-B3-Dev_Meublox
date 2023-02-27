import FiltrePrix from "../filtres/FiltrePrix";
import Filtres from "../filtres/Filtres";
import Object from "../Object/Object";
import './ObjectsList.scss';

const ObjectsList = (props) => {

    const allData = props.allData;
    const objectsData = props.dataPopular;

    console.log("ObjectList - allData");
    console.log(allData)

    return (
        <div className="contenu">
            <h1>Produits Populaires</h1>
            <div className='trait'></div>
            <Filtres data={allData} />
            <div className="objects-list">
                {allData.map((object) => {
                    return (
                        <Object object={object} />
                    )
                })}

            </div>
        </div>
    )
}

export default ObjectsList;