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
  
    const recipeList = await recipeData.getAllRecipes(req.params.id);
    var recipes = [];
    for(let i=0;i<recipeList.length;i++)
    {
      let showRecipe = {
      _id: recipeList[i]._id,
      title: recipeList[i].title
    };

      recipes.push(showRecipe);
    }
    //res.json(recipe);
    res.json(recipes);
  } catch (e) {
    res.status(404).json({ error: "Recipes not found" });
  }
});

router.post("/", async (req, res) => {
  const recipeInfo = req.body;

  if (!recipeInfo) {
    res.status(400).json({ error: "You must provide data to create a recipe" });
    return;
  }

  if (!recipeInfo.title || typeof recipeInfo.title !== 'string') {
    res.status(400).json({ error: "You must provide a valid title" });
    return;
  }

  if (!recipeInfo.ingredients) {
    res.status(400).json({ error: "You must provide a ingredients" });
    return;
  }
  if (!recipeInfo.steps) {
    res.status(400).json({ error: "You must provide steps" });
    return;
  }
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
    res.status(200).send("Recipe with deleted");
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});

module.exports = router;
