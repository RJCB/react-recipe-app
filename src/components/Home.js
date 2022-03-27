import React, { useState, useEffect } from "react";
import { API_URL, API_KEY } from "../config";
//axios
import axios from 'axios';
//components
import Hero from "./Hero";
import Thumb from "./Thumb";
import Spinner from "./Spinner";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    //fetch random recipes
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setError(false);
                setLoading(true);
                if (!searchTerm) {
                    const sessionState = sessionStorage.getItem('randomRecipes');
                    if (sessionState) {
                        return setRecipes(JSON.parse(sessionState));
                    }
                }
                const randomRecipes = searchTerm ? await axios.get(`${API_URL}/complexSearch?query=${searchTerm}&number=12&apiKey=${API_KEY}`) : await axios.get(`${API_URL}/random?query=${searchTerm}&number=12&apiKey=${API_KEY}`);
                const result = searchTerm ? randomRecipes.data.results : randomRecipes.data.recipes;
                setLoading(false);
                setRecipes(result);
                if (!searchTerm) return sessionStorage.setItem("randomRecipes", JSON.stringify(result));
            } catch (error) {
                setError(true);
            }
        }
        fetchRecipes();
        setCuisine('');
        setLoading(false);
    }, [searchTerm]);

    //fetch recipes based on Cuisine selected
    useEffect(() => {
        if (cuisine) {
            const fetchRecipesByCuisine = async () => {
                try {
                    setLoading(true);
                    const randomRecipes = await axios.get(`${API_URL}/complexSearch?cuisine=${cuisine}&apiKey=${API_KEY}`);
                    const result = randomRecipes.data.results;
                    setLoading(false);
                    setRecipes(result);
                } catch (error) {
                    setError(true);
                }
            }
            fetchRecipesByCuisine();
            setLoading(false);
        }
    }, [cuisine]);

    const recipeThumbs = recipes.map(recipe => {
        return <Thumb recipeId={recipe.id}
            key={recipe.id}
            image={recipe.image}
            title={recipe.title} />
    })

    const handleCuisineSelection = (cuisine) => {
        setCuisine(cuisine);
    }

    return (
        <div className="main-container">
            <Hero
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleCuisineSelection={handleCuisineSelection}
                cuisineState={cuisine} />
            {loading && <Spinner />}
            {!loading && error ? <p className="error-message">Sorry, something went wrong.</p> :
                <>{recipes && <div className="recipe-thumb">{recipeThumbs}</div>}</>
            }
        </div>
    )
}

export default Home;