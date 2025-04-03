import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from '../config/axios';

const Recipe = ({ title, cookingTime, servings, image }) => {
    return (
        <div className="recipe-card">
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <div className="recipe-meta">
                {cookingTime} mins | {servings} servings
            </div>
        </div>
    );
}

export default Recipe; 