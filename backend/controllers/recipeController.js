const Recipe = require("../models/Recipe");
const fs = require("fs");

exports.createRecipe = async (req, res) => {
  const { title, description, category, ingredients, instructions } = req.body;

  try {
    const recipe = new Recipe({
      title,
      description,
      category,
      ingredients,
      instructions,
      user: req.user.id,
      image: req.file ? req.file.filename : null,
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getRecipes = async (req, res) => {
  const { category } = req.query;

  try {
    let query = {};
    if (category) {
      query = { category };
    }

    const recipes = await Recipe.find(query).populate("user", "name");
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("user", "name")  // Populate the user who created the recipe
      .populate("comments.user", "name");  // Populate the users who commented
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.addComment = async (req, res) => {
  const { text } = req.body;

  // Validate that comment text is provided
  if (!text) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Add comment with the user ID and text
    recipe.comments.push({ text, user: req.user.id });
    await recipe.save();
    
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.addRating = async (req, res) => {
  const { rating } = req.body;

  // Validate rating
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    // Check if req.user exists
    if (!req.user || !req.user.id) {
      console.error("User not authenticated or missing from request.");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if user has already rated the recipe
    const existingRating = recipe.ratings.find(
      (r) => r.user.toString() === req.user.id.toString() // Ensure user comparison is correct
    );

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = rating;
    } else {
      // Add new rating
      recipe.ratings.push({ rating, user: req.user.id });
    }

    // Save the updated recipe
    await recipe.save();

    res.status(201).json(recipe); // Send the updated recipe data
  } catch (error) {
    console.error("Error in addRating:", error); // Improved logging
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};





