import React from "react";
import searchIcon from "../images/search-icon.svg";

//Cuisines list
import cuisineOptions from "../cuisineOptions.json";

const Hero = ({ searchTerm, setSearchTerm, handleCuisineSelection, cuisineState }) => {
    const cuisineElements = cuisineOptions.cuisines.map((cuisine, index) => {
        return <button className={cuisineState === cuisine ? "selected" : ""} key={index} value={cuisine} onClick={e => handleCuisineSelection(e.target.value)}>{cuisine}</button>
    })
    return (
        <div className="hero">
            <div className="searchbar-container">
                <img src={searchIcon} alt="search-icon" />
                <input type="text"
                    placeholder="Search Recipe"
                    onChange={e => setSearchTerm(e.currentTarget.value)}
                    value={searchTerm} />
            </div>
            {cuisineElements &&
                <div className="cuisines"><span>Search by cuisine:</span>{cuisineElements}</div>
            }
        </div>
    )
}

export default Hero;