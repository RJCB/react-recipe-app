import React from "react";
import noImage from "../images/no_image.jpg";
import { Link } from "react-router-dom";

const Thumb = ({ recipeId, image, title }) => {
    return (
        <Link to={`${recipeId}`}>
            <img src={image ? image : noImage} alt={title} />
            <p>{title}</p>
        </Link>
    )
}

export default Thumb;