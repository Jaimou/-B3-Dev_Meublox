import FiltrePrix from "../filtres/FiltrePrix";
import Filtres from "../filtres/Filtres";
import Object from "../Object/Object";
import './ObjectsList.scss';

const ObjectsList = (props) => {

    const allData = props.allData;
    const objectsData = props.dataPopular;

    return (
        <div className="contenu">
            <h1>Produits Populaires</h1>
            <div className='trait'></div>
            <Filtres data={allData} />
            <div className="objects-list">
                {objectsData.map((object) => {
                    return (
                        <a href={'/' + object + '/' + object}>
                            <Object object={object} />
                        </a>
                    )
                })}

            </div>
        </div>
    )
}

export default ObjectsList;