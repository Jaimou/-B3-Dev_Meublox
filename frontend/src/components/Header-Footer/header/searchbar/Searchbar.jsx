import React from "react";
import { useState } from 'react';
import './Searchbar.scss'


const Searchbar = () => {

    const [searchInput, setSearchInput] = useState("");

    const meubles = [
        { name: "chaise n°1", category: "chaise", price: "30€" },
        { name: "chaise n°2", category: "chaise", price: "30€" },
        { name: "chaise n°3", category: "chaise", price: "30€" },
        { name: "chaise n°4", category: "chaise", price: "30€" },
        { name: "chaise n°5", category: "chaise", price: "30€" },
        { name: "table n°1", category: "table", price: "80€" },
        { name: "table n°2", category: "table", price: "80€" },
        { name: "table n°3", category: "table", price: "80€" },
        { name: "table n°4", category: "table", price: "80€" },
        { name: "table n°5", category: "table", price: "80€" }
    ];

    const handleChange = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setSearchInput(lowerCase);
    };

    const filteredData = meubles.filter((item) => {
        if (searchInput === '') {
            return item;
        }
        else {
            return item.name.includes(searchInput)
        }
    });


    return (
        <div className="search">
            <div>
                <form id="search-form" role="search">
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
                {filteredData.map((item) => (
                    <a className="item-searchbar" href={'/' + item.category + '/' + item.name}>{item.name}</a>
                ))}
            </div>
        </div>
    )

};

export default Searchbar