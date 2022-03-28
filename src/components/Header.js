import React from "react";
import { Link } from "react-router-dom";
//icons
import cutleryIcon from "../images/cutlery-icon.png";
import recipeIcon from "../images/recipe-icon.png";
const Header = () => {
    return (
        <header>
            <Link to="/">
                <img src={recipeIcon} alt="salad" />
                <img src={cutleryIcon} alt="cutlery" />
            </Link>
        </header>
    )
}

export default Header;