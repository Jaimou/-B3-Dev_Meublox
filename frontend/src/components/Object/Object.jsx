import StarRating from "../starRating/StarRating";
import './Object.scss';

const Object = (props) => {

    const object = props.object;
    const rates = object.users_id;


    return (
        <div className="object">
            <div className="img-div">
                <img alt="object-img" src={object.images[0]} className="principal-object-image" />
            </div>
            <h3 className="name">{object.nom}</h3>
            <p className="description">{object.short_description}</p>
            <p className="price">{object.prix.toFixed(2)} €</p>
            <div className="rate">
                <StarRating note={object.note} />
                {rates == null || rates == "undefined" ?
                    <p>(0)</p>
                    :
                    <p>({rates.length})</p>
                }
            </div>
        </div>
    )
}

export default Object;