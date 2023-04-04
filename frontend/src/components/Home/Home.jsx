import ObjectsList from '../objectsList/ObjectsList';
import './Home.scss';

const Home = () => {

    const data = [
        {
            Index: 1,
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 1',
            Price: 35,
            Rate: 3.14,
            Rates: [12454978456486, 15648646461486, 2251611, 84861354, 1486468486],
            Color: "red",
        },
        {
            Index: 2,
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 2',
            Price: 70,
            Rate: 4.15,
            Rates: [12454978456486, 15648646461486, 2251611, 78944661, 1486468486],
            Color: "green",
        },
        {
            Index: 3,
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 3',
            Price: 150,
            Rate: 1.75,
            Rates: [12454978456486, 15648646461486, 251646846646846, 84861354, 1486468486],
            Color: "blue",
        },
        {
            Index: 4,
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 4',
            Price: 200,
            Rate: 0.74,
            Rates: [12454978456486, 15464564843384, 846486, 468486468, 2251611, 84861354, 1486, 468486],
            Color: "red",
        },
        {
            Index: 5,
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
            Index: 1,
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 1',
            Price: 35,
            Rate: 3.14,
            Rates: [12454978456486, 15648646461486, 2251611, 84861354, 1486468486],
            Color: "red",
        },
        {
            Index: 2,
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 2',
            Price: 70,
            Rate: 4.15,
            Rates: [12454978456486, 15648646461486, 2251611, 78944661, 1486468486],
            Color: "green",
        },
        {
            Index: 3,
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 3',
            Price: 150,
            Rate: 1.75,
            Rates: [12454978456486, 15648646461486, 251646846646846, 84861354, 1486468486],
            Color: "blue",
        },
        {
            Index: 4,
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 4',
            Price: 200,
            Rate: 0.74,
            Rates: [12454978456486, 15464564843384, 846486, 468486468, 2251611, 84861354, 1486, 468486],
            Color: "red",
        },
        {
            Index: 5,
            ImageThumbnailUrl: 'https://cocktail-scandinave.fr/wp-content/uploads/2022/05/canape-upson.jpg',
            ShortDescription: 'Lorem Ipsum radem ursut 5',
            Price: 200,
            Rate: 2.86,
            Rates: [12454978456486, 15464564843384, 846486, 468486468, 2251611, 84861354, 1486, 468486],
            Color: "blue",
        }
    ];

    const mostPopular = () => {
        const objectsData = data.sort((a, b) => b.Rate - a.Rate);
        const objectsDataPopular = objectsData.splice(0, 4);
        return objectsDataPopular
    }

    return (
        <div>
            <ObjectsList allData={allData} dataPopular={mostPopular()} />
        </div>
    )
}

export default Home;