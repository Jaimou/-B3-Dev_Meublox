import Filtres from "../filtres/Filtres";
import ObjectsList from "../objectsList/ObjectsList";

const Recherche = () => {

    const data = [
        {
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 1',
            Price: 35,
            Rate: 3.14,
            Rates: [12454978456486, 15648646461486, 2251611, 84861354, 1486468486],
            Color: "red",
        },
        {
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 2',
            Price: 70,
            Rate: 4.15,
            Rates: [12454978456486, 15648646461486, 2251611, 78944661, 1486468486],
            Color: "green",
        },
        {
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 3',
            Price: 150,
            Rate: 1.75,
            Rates: [12454978456486, 15648646461486, 251646846646846, 84861354, 1486468486],
            Color: "blue",
        },
        {
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 4',
            Price: 200,
            Rate: 0.74,
            Rates: [12454978456486, 15464564843384, 846486, 468486468, 2251611, 84861354, 1486, 468486],
            Color: "red",
        },
        {
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 5',
            Price: 200,
            Rate: 2.86,
            Rates: [12454978456486, 15464564843384, 846486, 468486468, 2251611, 84861354, 1486, 468486],
            Color: "blue",
        }
    ];

    const allData = [
        {
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 1',
            Price: 35,
            Rate: 3.14,
            Rates: [12454978456486, 15648646461486, 2251611, 84861354, 1486468486],
            Color: "red",
        },
        {
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 2',
            Price: 70,
            Rate: 4.15,
            Rates: [12454978456486, 15648646461486, 2251611, 78944661, 1486468486],
            Color: "green",
        },
        {
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 3',
            Price: 150,
            Rate: 1.75,
            Rates: [12454978456486, 15648646461486, 251646846646846, 84861354, 1486468486],
            Color: "blue",
        },
        {
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 4',
            Price: 200,
            Rate: 0.74,
            Rates: [12454978456486, 15464564843384, 846486, 468486468, 2251611, 84861354, 1486, 468486],
            Color: "red",
        },
        {
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 5',
            Price: 200,
            Rate: 2.86,
            Rates: [12454978456486, 15464564843384, 846486, 468486468, 2251611, 84861354, 1486, 468486],
            Color: "blue",
        }
    ];

    const searchData = () => {
        data.includes()
    }


    return (

        <div className="contenu">
            <h3><a href="/">Produit</a> &gt; <a>Type</a></h3>
            <div className='trait'></div>
            <Filtres data={data} />
            <ObjectsList allData={data} />
        </div>
    );

}

export default Recherche;