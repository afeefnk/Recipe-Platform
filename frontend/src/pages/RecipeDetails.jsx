import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/getbyid/${id}`);
        console.log("Fetched Recipe:", response.data);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log("Submitting comment:", comment)

    try {
      const response = await axios.post(`http://localhost:5000/api/recipes/comment/${id}`, { text: comment },
        {
          headers: {
            'Authorization': `Bearer ${token}`  // Send the token in the Authorization header
          }
        }
      ); 
      console.log("Comment added:", response.data);
      setComment("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding comment", error.response?.data || error.message);
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage. User might not be logged in.");
      alert("Please log in to rate the recipe."); // Notify the user
      return; // Exit if no token is found
    }

    console.log("Token being sent:", token); // Log the token for verification

    try {
      const response = await axios.post(
        `http://localhost:5000/api/recipes/rating/${id}`,
        { rating: Number(rating) }, // Ensure rating is sent as a number
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request header
          },
        }
      );
      console.log("Rating successfully added:", response.data);
      setRating(0);
      window.location.reload(); // Reload to see changes
    } catch (error) {
      console.error("Error adding rating:", error.response?.data || error.message);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`); // Alert the user of the error
      }
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">{recipe.title}</h2>
      <img
        src={`http://localhost:5000/images/${recipe.image}`} // Updated image path
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-4 shadow-md"
      />
      <h3 className="text-xl font-semibold text-gray-800">Description</h3>
      <p className="mb-4 text-gray-700">{recipe.description}</p>
      <h3 className="text-xl font-semibold text-gray-800">Ingredients</h3>
      <p className="mb-4 text-gray-700">{recipe.ingredients}</p>
      <h3 className="text-xl font-semibold text-gray-800">Instructions</h3>
      <p className="text-gray-700">{recipe.instructions}</p>

      <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Ratings</h3>
      <ul className="mb-4">
        {recipe.ratings && recipe.ratings.map((rate, index) => (
          <li key={index} className="mb-2 text-gray-600">
            {rate.rating} {/* Display user name and rating */}
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Comments</h3>
      <ul className="mb-4">
        {recipe.comments && recipe.comments.map((comment, index) => (
          <li key={index} className="mb-2 text-gray-600">
            <strong>{comment.user.name}</strong>: {comment.text}
            <br />
            <small className="text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          className="w-full p-4 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Add Comment
        </button>
      </form>

      <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-800">Rate this Recipe</h3>
      <form onSubmit={handleRatingSubmit}>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          max="5"
          min="1"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Rate
        </button>
      </form>
    </div>
  );
};

export default RecipeDetails;
