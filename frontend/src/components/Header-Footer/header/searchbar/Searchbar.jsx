import React, { useEffect } from "react";
import { useState } from 'react';
import './Searchbar.scss'
import { useNavigate } from "react-router-dom";


const Searchbar = () => {

    const [searchInput, setSearchInput] = useState("");
    const [products, setProducts] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {

        const callAPI = async () => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            let response = await fetch("http://localhost:8000/products", requestOptions);
            const responseInJSON = await response.json();
            setProducts(responseInJSON)
            setIsLoad(true)
        }

        callAPI()
    }, [])



    let allFilteredDataType = []
    const navigate = useNavigate()

    const handleChange = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setSearchInput(lowerCase);
    };

    const handleSubmit = () => {
        navigate(`products/search/${searchInput}`)
    }

    const filteredData = products.filter((item) => {
        if (searchInput === '') {
            return item;
        }
        else {
            const itemNames = item.nom.includes(searchInput)
            const categories = item.categorie.includes(searchInput)
            if (itemNames || categories) {

                item.categorie.map((categorie) => {
                    if (categorie.includes(searchInput)) {
                        allFilteredDataType.push(categorie)
                    }
                })
            }
            return itemNames
        }
    });

    const filteredDataType = [...new Set(allFilteredDataType)]


    return (
        <div className="search">
            <div>
                <form id="search-form" role="search" onSubmit={handleSubmit}>
                    <input
                        id="searchBar"
                        variant="outlined"
                        aria-label="Recherche de produits"
                        placeholder="Recherche &nbsp;"
                        type="search"
                        onChange={handleChange}

                    />
                </form>
            </div>

            <div id="results" style={{ display: (searchInput.length > 1) ? 'flex' : 'none' }}>
                <h3>Catégories :</h3>
                {filteredDataType.map((item) => {
                    return (
                        <a className="itemType-searchbar" href={'/products/category/' + item}>{item}</a>
                    )
                })}
                <div className='trait'></div>

                <h3>Produits :</h3>

                {filteredData.map((item) => (
                    <a className="itemName-searchbar" href={'/products/' + item._id}>{item.nom}</a>
                ))}
            </div>
        </div>
    )

};

export default Searchbar