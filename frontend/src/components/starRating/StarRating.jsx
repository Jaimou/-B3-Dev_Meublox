import './StarRating.scss'
import StarOn from './StarOn';
import StarOff from './StarOff';

const StarRating = (props) => {

    const rate = props.note;


    const getRate = (rate) => {
        if (rate < 0.75) {
            return (
                <div className="star-rate">
                    <StarOff />
                    <StarOff />
                    <StarOff />
                    <StarOff />
                    <StarOff />
                </div>
            )
        }
        else if (rate < 1.75) {
            return (
                <div className="star-rate">
                    <StarOn />
                    <StarOff />
                    <StarOff />
                    <StarOff />
                    <StarOff />
                </div>
            )
        }
        else if (rate < 2.75) {
            return (
                <div className="star-rate">
                    <StarOn />
                    <StarOn />
                    <StarOff />
                    <StarOff />
                    <StarOff />
                </div>
            )
        }
        else if (rate < 3.75) {
            return (
                <div className="star-rate">
                    <StarOn />
                    <StarOn />
                    <StarOn />
                    <StarOff />
                    <StarOff />
                </div>
            )
        }
        else if (rate < 4.75) {
            return (
                <div className="star-rate">
                    <StarOn />
                    <StarOn />
                    <StarOn />
                    <StarOn />
                    <StarOff />
                </div>
            )
        }
        else if (4.75 < rate) {
            return (
                <div className="star-rate">
                    <StarOn />
                    <StarOn />
                    <StarOn />
                    <StarOn />
                    <StarOn />
                </div>
            )
        }
    };


    return (
        <div>
            {getRate(rate)}
        </div>
    );
}

export default StarRating;