import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import CreateRecipe from './components/CreateRecipe';
import Recipe from './components/Recipe';
import RecipeList from './components/RecipeList';
import SpoonacularRecipes from './components/SpoonacularRecipes';
import RecipeDetail from './components/RecipeDetail';
import Home from './components/Home';
import Footer from './components/Footer';
import WinePage from './components/WinePage';
import ProductsPage from './components/ProductsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-recipes" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/explore" element={<SpoonacularRecipes />} />
          <Route path="/explore/:id" element={<RecipeDetail />} />
          <Route path="/wines" element={<WinePage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
