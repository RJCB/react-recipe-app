import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Header from "./components/Header";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <HashRouter basename="/">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:recipeId" element={<RecipeDetails />} />
      </Routes>
    </HashRouter>
  );
}

export default App;