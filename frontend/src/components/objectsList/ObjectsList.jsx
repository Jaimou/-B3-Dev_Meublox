import Object from "../Object/Object";
import './ObjectsList.scss';

const ObjectsList = () => {

    const objectsData = [
        {
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut',
            Price: 35,
            Rate: 3.14,
            Rates: [12454978456486, 15648646461486, 2251611, 84861354, 1486468486]
        },
        {
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut',
            Price: 70,
            Rate: 4.15,
            Rates: [12454978456486, 15648646461486, 2251611, 78944661, 1486468486]
        },
        {
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut',
            Price: 150,
            Rate: 1.75,
            Rates: [12454978456486, 15648646461486, 251646846646846, 84861354, 1486468486]
        },
        {
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut',
            Price: 200,
            Rate: 0.74,
            Rates: [12454978456486, 15464564843384, 846486, 468486468, 2251611, 84861354, 1486, 468486]
        }
    ];


    return (
        <div>
            <h1>Produits Populaires</h1>
            <div className='trait'></div>
            <div className="objects-list">
                {objectsData.map((object) => {
                    return (
                        <Object object={object} />
                    )
                })}
            </div>
        </div>
    )
}

export default ObjectsList;