import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CreateRecipe from './components/CreateRecipe';
import Recipe from './components/Recipe';
import RecipeList from './components/RecipeList';






function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/favorites" element={<div>Favorites Page (Coming Soon)</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
