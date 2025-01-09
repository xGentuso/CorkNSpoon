import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CreateRecipe from './components/CreateRecipe';
import Recipe from './components/Recipe';
import RecipeList from './components/RecipeList';
import TastyRecipes from './components/TastyRecipes';
import RecipeDetail from './components/RecipeDetail';
import Home from './components/Home';
import Footer from './components/Footer';
import './styles/Footer.css';






function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/favorites" element={<div>Favorites Page (Coming Soon)</div>} />
          <Route path="/tasty-recipes" element={<TastyRecipes />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
