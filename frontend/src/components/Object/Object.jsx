import StarRating from "../starRating/StarRating";
import './Object.scss';

const Object = (props) => {

    const object = props.object;
    const rates = object.note;


    return (
        <div className="object">
            <div className="img-div">
                <img alt="object-img" src={object.images[0]} className="principal-object-image" />
            </div>
            <h3 className="name">{object.nom}</h3>
            <p className="description">{object.short_description}</p>
            <p className="price">{object.prix.toFixed(2)} €</p>
            <div className="rate">
                <StarRating rate={object.note} />
                <p>({rates})</p>
            </div>
        </div>
    )
}

export default Object;