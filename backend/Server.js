const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
  })
);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1); // Exit process with failure
  }
};
connectDB();

app.use(
  "/images",
  express.static(path.join(__dirname, "public/images"))
);

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
