const express = require("express");
const router = express.Router();
const data = require("../data");
const recipeData = data.recipes;

router.get("/:id", async (req, res) => {
  try {
    const recipe = await recipeData.getRecipeById(req.params.id);
    res.json(recipe);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const recipeList = await recipeData.getAllRecipes();
    res.json(recipeList);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  const recipeInfo = req.body;

  // if (!userInfo) {
  //   res.status(400).json({ error: "You must provide data to create a user" });
  //   return;
  // }

  // if (!userInfo.firstName) {
  //   res.status(400).json({ error: "You must provide a first name" });
  //   return;
  // }

  // if (!userInfo.lastName) {
  //   res.status(400).json({ error: "You must provide a last name" });
  //   return;
  // }

  try {
    const newRecipe = await recipeData.addRecipe(
      recipeInfo.title,
      recipeInfo.ingredients,
      recipeInfo.steps,
      recipeInfo.comments
    );
    res.json(newRecipe);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  const recipeInfo = req.body;

  // if (!userInfo) {
  //   res.status(400).json({ error: "You must provide data to update a user" });
  //   return;
  // }

  // if (!userInfo.firstName) {
  //   res.status(400).json({ error: "You must provide a first name" });
  //   return;
  // }

  // if (!userInfo.lastName) {
  //   res.status(400).json({ error: "You must provide a last name" });
  //   return;
  // }

  try {
    await recipeData.getRecipeById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
    return;
  }

  try {
    const updatedRecipe = await recipeData.updateRecipe(req.params.id, recipeInfo);
    res.json(updatedRecipe);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await recipeData.getRecipeById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
    return;
  }

  try {
    await recipeData.removeRecipe(req.params.id);
    res.status(200).send("Recipe deleted");
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});

module.exports = router;
