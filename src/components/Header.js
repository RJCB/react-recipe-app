import React from "react";
//icons
import cutleryIcon from "../images/cutlery-icon.png";
import recipeIcon from "../images/recipe-icon.png";
const Header = () => {
    return (
        <header>
            <img src={recipeIcon} alt="salad" />
            <img src={cutleryIcon} alt="cutlery" />
        </header>
    )
}

export default Header;