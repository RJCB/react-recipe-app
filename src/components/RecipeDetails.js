import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//config
import { API_URL, API_KEY } from "../config";
//axios
import axios from 'axios';
const RecipeDetails = () => {
    const { recipeId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [recipeDetails, setRecipeDetails] = useState([]);
    const [showIngredients, setShowIngredients] = useState(false);
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
                    time: data.cookingMinutes,
                    ingredients: data.extendedIngredients,
                    image: data.image,
                    nutrition: data.nutrients,
                    servings: data.servings,
                    summary: data.summary,
                    title: data.title,
                    vegetarian: data.vegetarian
                }
                setLoading(true);
                console.log(recipeSummary);
                setRecipeDetails(recipeSummary);//create a custom object with what we need
            } catch (error) {
                setError(true);
            }
        }
        fetchRecipeById();
        setLoading(false);
    }, [recipeId]);

    const toggleButtons = () => {
        setShowIngredients(prevValue => {
            return !prevValue;
        })
    }

    const ingredientsElements = () => {
        if (recipeId) {
            const elements = recipeDetails.ingredients.map((ingredient) => {
                return <li key={ingredient.id}>{ingredient.original}</li>
            })
            return elements;
        }
    }
    // const ingredientsElements = recipeDetails.ingredients.map((ingredient) => {
    //     return <li key={ingredient.id}>{ingredient.original}</li>
    // })

    // const ingredientsElements = () => {
    //     // let elements = [];
    //     console.log(recipeDetails.ingredients);
    //     for (const ingredient in recipeDetails.ingredients) {
    //         return <p key={recipeDetails.ingredients[ingredient].id}>{recipeDetails.ingredients[ingredient].original}</p>;
    //     }
    //     {/* return elements; */ }
    // }

    // const instructionsElements = recipeDetails.ingredients.map((ingredient) => {
    //     return <li key={ingredient.id}>{ingredient.original}</li>
    // })

    return (
        <div className="main-container recipe-details">
            <h1>Recipe</h1>
            <div className="details-container">
                <img src={recipeDetails.image} alt={recipeDetails.title} />
                <div>
                    <h2>{recipeDetails.title}</h2>
                    <p>{recipeDetails.summary}</p>
                    <ul>
                        <li>Likes: {recipeDetails.aggregateLikes}</li>
                        <li>Vegetarian: {recipeDetails.vegetarian}</li>
                        <li>Ready in: {recipeDetails.time}</li>
                        <li>Servings: {recipeDetails.servings}</li>
                    </ul>
                    <div>
                        <button onClick={toggleButtons}>Instructions</button>
                        <button onClick={toggleButtons}>Ingredients</button>
                        {recipeDetails && showIngredients ? <div><ul>{ingredientsElements()}</ul></div> : <div dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeDetails;