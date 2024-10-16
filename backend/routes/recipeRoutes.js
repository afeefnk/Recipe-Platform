const express = require("express");
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  addComment,
  addRating,
} = require("../controllers/recipeController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, upload.single("image"), createRecipe);
router.get("/get", getRecipes);
router.get("/getbyid/:id", getRecipeById);
router.post("/comment/:id",authMiddleware, addComment);
router.post("/rating/:id",authMiddleware,  addRating);

module.exports = router;
