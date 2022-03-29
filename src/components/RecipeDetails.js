import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//config
import { API_URL, API_KEY } from "../config";
//axios
import axios from 'axios';
//icons
import { BiTime } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import { GiForkKnifeSpoon } from 'react-icons/gi';

import noImage from "../images/no_image.jpg";

import { Link } from "react-router-dom";

const RecipeDetails = () => {
    // const componentDataReady = useRef(false);
    const { recipeId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [recipeDetails, setRecipeDetails] = useState([]);
    const [showIngredients, setShowIngredients] = useState(false);

    // fetch recipes by ID which is pulled in from the :route when user clicks on a specific recipe on homepage
    useEffect(() => {
        const fetchRecipeById = async () => {
            try {
                setError(false);
                setLoading(true);
                const recipeById = await axios.get(`${API_URL}/${recipeId}/information?includeNutrition=true&apiKey=${API_KEY}`);
                const data = recipeById.data;
                const recipeSummary = {
                    id: data.id,
                    aggregateLikes: data.aggregateLikes,
                    instructions: data.instructions,
                    time: data.readyInMinutes,
                    ingredients: data.extendedIngredients,
                    image: data.image ? data.image : noImage,
                    nutrition: data.nutrients,
                    servings: data.servings,
                    summary: data.summary,
                    title: data.title,
                    vegetarian: data.vegetarian
                }
                setLoading(false);
                setRecipeDetails(recipeSummary);//create a custom object with what we need
                // componentDataReady.current = true;
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }
        fetchRecipeById();
    }, [recipeId]);

    const toggleButtons = () => {
        setShowIngredients(prevValue => {
            return !prevValue;
        })
    }

    const ingredientsElements = () => {
        const elements = recipeDetails.ingredients.map((ingredient, index) => {
            return <li key={`${index}#${ingredient.id}`}>{ingredient.original}</li>
        })
        return elements;
    }

    return (
        <div className="main-container recipe-details">
            <Link className="back-to-home" to="/">Back to search page</Link>
            <h1>Recipe</h1>
            <div className="details-container">
                <div className="details-image">
                    <img src={recipeDetails.image} alt={recipeDetails.title} />
                </div>
                <div className="details-info">
                    <h2>{recipeDetails.title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: recipeDetails.summary }} />
                    <ul className="details-brief-info">
                        <li><span className="details-icon"><AiFillLike /></span><span>Likes:</span>{recipeDetails.aggregateLikes}</li>
                        <li><span className="details-icon"><BiTime /></span><span>Ready in:</span>{recipeDetails.time}</li>
                        <li><span className="details-icon"><GiForkKnifeSpoon /></span><span>Servings:</span>{recipeDetails.servings}</li>
                        {recipeDetails.ingredients ? <li><span>Number of ingredients:</span>{recipeDetails.ingredients.length}</li> : null}
                    </ul>
                    <div>
                        <button className={!showIngredients ? "active" : ''} onClick={showIngredients ? toggleButtons : null}>Instructions</button>
                        <button className={showIngredients ? "active" : ''} onClick={!showIngredients ? toggleButtons : null}>Ingredients</button>
                        {recipeDetails && showIngredients ? <div className="details-ingredients"><ul>{ingredientsElements()}</ul></div> : <div className="details-instructions" dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetails;