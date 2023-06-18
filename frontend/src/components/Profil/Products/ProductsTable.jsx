import React, { useState } from 'react';
import './ProductsTable.scss'

const ProductsTable = (props) => {

    let products = props.products;
    const setInputs = props.setInputs
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(2);

    // Calcul du numéro de la dernière page
    const lastPageIndex = currentPage * productsPerPage;
    const firstPageIndex = lastPageIndex - productsPerPage;

    // Pagination : Récupération des utilisateurs actuels
    const currentProducts = products.slice(firstPageIndex, lastPageIndex);


    // Changement de page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const deleteProduct = async (productId) => {

        let request = await fetch(`http://localhost:8000/products/${productId}`, {
            method: 'DELETE',
        })
        let responseProfile = await request.json();
    }

    const chooseProduct = (product) => {

        let allColors = []
        let allCategories = []

        product.couleurs.map(couleur => {
            allColors.push({ value: couleur, label: couleur })
        })

        product.categorie.map(cat => {
            allCategories.push({ value: cat, label: cat })
        })

        let selectedProduct = {
            id: product._id,
            nom: product.nom,
            description: product.description,
            short_description: product.short_description,
            prix: product.prix,
            images: product.images,
            couleurs: allColors,
            stock: product.stock,
            categorie: allCategories
        }
        setInputs(selectedProduct);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Stock</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map(product => (
                        <>
                            <tr key={product._id}>
                                <td>
                                    <button onClick={() => chooseProduct(product)}>Selectionner</button>
                                </td>
                                <td>{product._id}</td>
                                <td >{product.nom}</td>
                                <td >{product.stock}</td>
                                <td>
                                    <button onClick={() => deleteProduct(product._id)}>Supprimer</button>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>

            <div>
                {products.length > productsPerPage && (
                    <ul className="pagination">
                        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => {
                            if (currentPage == index + 1) {
                                return (

                                    <li className='is-selected' key={index} onClick={() => paginate(index + 1)}>
                                        <a href="#!" >{index + 1}</a>
                                    </li>
                                )
                            }
                            else {
                                return (

                                    <li key={index} onClick={() => paginate(index + 1)}>
                                        <a href="#!">{index + 1}</a>
                                    </li>
                                )
                            }

                        }
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProductsTable;
