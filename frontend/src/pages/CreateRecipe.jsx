import axios from "axios";
import React, { useState } from "react";

const CreateRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    ingredients: "",
    instructions: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipeData = new FormData();
    recipeData.append("title", formData.title);
    recipeData.append("description", formData.description);
    recipeData.append("category", formData.category);
    recipeData.append("ingredients", formData.ingredients);
    recipeData.append("instructions", formData.instructions);
    recipeData.append("image", formData.image);

    axios
      .post("http://localhost:5000/api/recipes/create", recipeData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error creating recipe", error);
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select a category</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="desserts">Desserts</option>
            <option value="main_course">Non-Vegetarian</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ingredients</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 bg-indigo-600 text-white rounded-md">
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
