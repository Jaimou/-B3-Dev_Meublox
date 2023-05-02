import StarRating from "../starRating/StarRating";
import './Object.scss';

const Object = (props) => {

    const object = props.object;
    const rates = object.Rates.length;


    return (
        <div className="object">
            <div className="img-div">
                <img alt="object-img" src={object.ImageThumbnailUrl} className="principal-object-image" />
            </div>
            <p className="description">{object.ShortDescription}</p>
            <p className="price">{object.Price.toFixed(2)} €</p>
            <div className="rate">
                <StarRating rate={object.Rate} />
                <p>({rates})</p>
            </div>
        </div>
    )
}

export default Object;