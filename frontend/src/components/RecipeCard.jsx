import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-2xl transition-transform transform hover:scale-105 mb-6">
      <img
        src={`http://localhost:5000/images/${recipe.image}`} // Updated image path
        alt={recipe.title}
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold">{recipe.title}</h3>
        <p className="text-gray-300 mt-2">{recipe.description}</p>
        <Link
          to={`/recipe/${recipe._id}`}
          className="mt-4 inline-block bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-yellow-400 transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
