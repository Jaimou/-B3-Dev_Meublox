import { useRef, useState } from "react";
import ProductsTable from "./ProductsTable";
import Select from "react-select";
import './ProductsAdmin.scss'

const ProductsAdmin = (props) => {
    let products = props.products;
    let images = []

    const [errors, setErrors] = useState({});

    const [inputs, setInputs] = useState({
        id: "",
        nom: "",
        description: "",
        short_description: "",
        prix: 0.00,
        images: [],
        couleurs: [],
        stock: 0,
        categorie: []
    });


    const colourOptions = [
        { value: 'Bleu', label: 'Bleu' },
        { value: 'Rouge', label: 'Rouge' },
        { value: 'Vert', label: 'Vert' },
        { value: 'Blanc', label: 'Blanc' },
        { value: 'Noir', label: 'Noir' },
        { value: 'Marron', label: 'Marron' },
        { value: 'Jaune', label: 'Jaune' },
        { value: 'Violet', label: 'Violet' },
        { value: 'Orange', label: 'Orange' },
        { value: 'Gris', label: 'Gris' },
    ];

    const categoryOptions = [
        { value: 'Meuble', label: 'Meuble' },
        { value: 'Canapé', label: 'Canapé' },
        { value: 'Lit', label: 'Lit' },
        { value: 'Bureau', label: 'Bureau' },
        { value: 'Chaise', label: 'Chaise' },
        { value: 'Table', label: 'Table' },
        { value: 'Lampe', label: 'Lampe' },
        { value: 'Armoire', label: 'Armoire' },
        { value: 'Rangement', label: 'Rangement' },
        { value: 'Dressing', label: 'Dressing' },
        { value: 'Bibliothèque', label: 'Bibliothèque' },

    ];

    const productForm = useRef();

    const handleInputChange = (event) => {
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    };

    const handleColorisChange = (event) => {
        setInputs((inputs) => ({
            ...inputs,
            couleurs: event,
        }));
    };

    const handleCategoryChange = (event) => {
        setInputs((inputs) => ({
            ...inputs,
            categorie: event,
        }));
    };

    const handleAddFirstImageChange = (event) => {
        images[0] = event.target.value;
        setInputs((inputs) => ({
            ...inputs,
            images: images,
        }));
    };

    const handleAddSecondImageChange = (event) => {
        images[1] = event.target.value;
        setInputs((inputs) => ({
            ...inputs,
            images: images,
        }));
    };

    const handleAddThirdImageChange = (event) => {
        images[2] = event.target.value;
        setInputs((inputs) => ({
            ...inputs,
            images: images,
        }));
    };

    const handleAddFourthImageChange = (event) => {
        images[3] = event.target.value;
        setInputs((inputs) => ({
            ...inputs,
            images: images,
        }));
    };





    const modifySubmit = () => {

        // methode put pour modifier le user
        const requestOptionsFirst = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nom: inputs.nom,
                description: inputs.description,
                short_description: inputs.short_description,
                prix: inputs.prix,
                images: inputs.images,
                couleurs: inputs.couleurs,
                stock: inputs.stock,
                categorie: inputs.categorie
            })
        };

        console.log(requestOptionsFirst.body)

        fetch(`http://localhost:8000/products/${inputs.id}`, requestOptionsFirst)
            .then(response => {
                response.json();
            })


    }

    return (
        <>
            <div className="profil-infos">
                <div className="profil-form">
                    <form ref={productForm} className="profil-form" onSubmit={modifySubmit}>
                        <div className="form-div">
                            <label htmlFor="nom">Nom du produit: </label>
                            <input
                                className="product-input"
                                type="text"
                                required={true}
                                id="nom"
                                name="nom"
                                value={inputs.nom}
                                onChange={(e) => { handleInputChange(e) }}
                            />
                        </div>
                        <div className="form-div">
                            <label htmlFor="short-description">Description courte: </label>
                            <input
                                className="product-input"
                                type="text"
                                required={true}
                                id="short-description"
                                name="short-description"
                                maxLength="150"
                                value={inputs.short_description}
                                onChange={(e) => { handleInputChange(e) }}
                            />
                        </div>

                        <div className="form-div">
                            <label htmlFor="description">Description longue: </label>
                            <input
                                className="product-input"
                                type="text-area"
                                required={true}
                                id="description"
                                name="description"
                                maxLength="300"
                                value={inputs.description}
                                onChange={(e) => { handleInputChange(e) }}
                            />
                        </div>

                        <div className="form-div">
                            <label htmlFor="prix">Prix du produit: </label>
                            <input
                                className="product-input"
                                type="number"
                                required={true}
                                id="prix"
                                name="prix"
                                value={inputs.prix}
                                onChange={(e) => { handleInputChange(e) }}
                            />
                        </div>

                        <div className="form-div">
                            <label htmlFor="images">Images : <em> copier un lien HTML de l'image</em></label>
                            <input
                                className="product-input"
                                value={inputs.images[0]}
                                type="text"
                                required={true}
                                id="images"
                                name="images"
                                placeholder="image 1"
                                onChange={(e) => { handleAddFirstImageChange(e) }}
                            />
                            <input
                                className="product-input"
                                value={inputs.images[1]}
                                type="text"
                                required={true}
                                id="images"
                                name="images"
                                placeholder="image 2"
                                onChange={(e) => { handleAddSecondImageChange(e) }}
                            />
                            <input
                                className="product-input"
                                value={inputs.images[2]}
                                type="text"
                                required={true}
                                id="images"
                                name="images"
                                placeholder="image 3"
                                onChange={(e) => { handleAddThirdImageChange(e) }}
                            />
                            <input
                                className="product-input"
                                value={inputs.images[3]}
                                type="text"
                                required={true}
                                id="images"
                                name="images"
                                placeholder="image 4"
                                onChange={(e) => { handleAddFourthImageChange(e) }}
                            />
                        </div>

                        <div className="form-div">
                            <label htmlFor="couleurs">Coloris: </label>
                            <Select
                                value={inputs.couleurs}
                                isMulti
                                name="couleurs"
                                options={colourOptions}
                                className="basic-multi-select product-input"
                                classNamePrefix="select"
                                required={true}
                                onChange={(e) => {
                                    handleColorisChange(e)
                                }}
                            />
                        </div>

                        <div className="form-div">
                            <label htmlFor="stock">Stock du produit: </label>
                            <input
                                className="product-input"
                                type="number"
                                required={true}
                                id="stock"
                                name="stock"
                                value={inputs.stock}
                                onChange={(e) => { handleInputChange(e) }}
                            />
                        </div>

                        <div className="form-div">
                            <label htmlFor="categories">Categories: </label>
                            <Select
                                value={inputs.categorie}
                                isMulti
                                id="categories"
                                name="categories"
                                options={categoryOptions}
                                className="basic-multi-select product-input"
                                classNamePrefix="select"
                                required={true}
                                onChange={(e) => { handleCategoryChange(e) }}
                            />
                        </div>

                        <button type="button" onClick={modifySubmit}>Valider</button>
                    </form>
                </div>
                <div className="products-table">
                    <ProductsTable products={products} setInputs={setInputs} />
                </div>

            </div>
        </>
    )
}

export default ProductsAdmin