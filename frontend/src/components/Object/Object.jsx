import StarRating from "../starRating/StarRating";
import './Object.scss';

const Object = (props) => {

    const object = props.object;
    const rates = object.rates.length;


    return (
        <div className="object">
            <div className="img-div">
                <img alt="object-img" src={object.imageThumbnailUrl} className="principal-object-image" />
            </div>
            <p className="description">{object.shortDescription}</p>
            <p className="price">{object.price.toFixed(2)} €</p>
            <div className="rate">
                <StarRating rate={object.rate} />
                <p>({rates})</p>
            </div>
        </div>
    )
}

export default Object;