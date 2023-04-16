import React from "react";
import { useState } from 'react';
import './Searchbar.scss'
import data from '../../../../lib/data/dataTest.jsx'
import { useNavigate } from "react-router-dom";


const Searchbar = () => {

    const [searchInput, setSearchInput] = useState("");

    const db = data;
    let allFilteredDataType = []
    const navigate = useNavigate()

    const handleChange = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setSearchInput(lowerCase);
    };

    const handleSubmit = () => {
        navigate(`products/search/${searchInput}`)
    }

    const filteredData = db.filter((item) => {
        if (searchInput === '') {
            return item;
        }
        else {
            const itemNames = item.Name.includes(searchInput)
            if (itemNames) {
                allFilteredDataType.push(item.Type)
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
                    <a className="itemName-searchbar" href={'/products/' + item.Id}>{item.Name}</a>
                ))}
            </div>
        </div>
    )

};

export default Searchbar