import React from "react";
import { useState } from 'react';
import TextField from "@mui/material/TextField";
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

    // let results = document.getElementById('results');

    // if (searchInput === '') {
    //     results.style.display = "none";
    // } else {
    //     results.style.display = "block";
    // }

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
            <TextField
                id="searchBar"
                variant="outlined"
                fullWidth
                label="Recherche"
                onChange={handleChange}
            />
            <div id="results" style={{ display: (searchInput !== '') ? 'block' : 'none' }}>
                {filteredData.map((item) => (
                    <p>{item.name}</p>
                ))}
            </div>
        </div>
    )

};

export default Searchbar