import { useEffect, useState } from "react";
import FiltrePrix from "../filtres/FiltrePrix";
import Filtres from "../filtres/Filtres";
import Object from "../Object/Object";
import './ObjectsList.scss';

const ObjectsList = (props) => {

    const allData = props.allData;
    const type = props.type

    const [data, setData] = useState([]);



    useEffect(() => {
        let currentUrl = window.location.href
        if (currentUrl == "http://localhost:3000/") {

            const objectsData = allData.sort((a, b) => b.note - a.note);

            const objectsDataPopular = objectsData.slice(0, 4)
            setData(objectsDataPopular)
        }
        if (currentUrl.includes("products/category/")) {

            const objectsDataPopular = allData.filter((product) => product.categorie.includes(type));

            setData(objectsDataPopular)
        }
        if (currentUrl.includes("products/search/")) {

            const objectsDataPopular = allData.filter((product) => product.nom.includes(type));
            setData(objectsDataPopular)
        }
        if (currentUrl == "http://localhost:3000/products") {

            const objectsDataPopular = allData.sort((a, b) => b.note - a.note);
            setData(objectsDataPopular)
        }


    }, [])


    return (
        <div className="contenu">

            <Filtres data={allData} setData={setData} />
            {data.length == 0 ?
                <div className="search-error">
                    <h3>
                        Nous sommes désolés...
                    </h3>
                    <h4>
                        Aucun résultat n'a été trouvé sur notre boutique.
                    </h4>
                    <a href="/">
                        <button type="button">Retour à la page d'accueil</button></a>
                </div> :


                <div className="objects-list">

                    {data.map((object) => {
                        return (
                            <a href={'/products/' + object._id}>
                                <Object object={object} />
                            </a>
                        )
                    })}
                </div>
            }

        </div>

    )
}

export default ObjectsList;