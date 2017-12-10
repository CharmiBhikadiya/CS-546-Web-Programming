const express = require("express");
const router = express.Router();
const data = require("../data");
const recipesData = data.recipes;

router.get("/recipe/:recipeId", async (req, res) => {
  try {
    const commentData = await recipesData.getAllCommentsByRecipeId(req.params.recipeId);
    res.json(commentData);
  } catch (e) {
    res.status(404).json({ error: "Comment not found" });
  }
});

router.get("/:commentId", async (req, res) => {
  try {
    const commentData = await recipesData.getCommentByCommentId(req.params.commentId);
    res.json(commentData);
  } catch (e) {
    res.status(404).json({ error: "Comment not found" });
  }
});

router.post("/:recipeId", async (req, res) => {
  const commentData = req.body;

  if (!commentData) {
      res.status(400).json({ error: "You must provide data to create a comment" });
      return;
  }

  if (!commentData.poster) {
      res.status(400).json({ error: "You must provide a poster" });
      return;
  }

  if (!commentData.comment) {
      res.status(400).json({ error: "You must provide a comment" });
      return;
  }
  try{
    await recipesData.getRecipeById(req.params.recipeId);
  } catch(e){
    res.status(500).json({ error: e });
  }
  try {
        const newComment= 
        await recipesData.addComment(req.params.recipeId, commentData.poster, commentData.comment);
    
        res.json(newComment);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    });

    router.put("/:recipeId/:commentId", async (req, res) => {
      const commentInfo = req.body;
  
      try {
        await recipesData.getRecipeById(req.params.recipeId);
      } catch (e) {
        res.json({ error: "No RecipeID found" });
        return;
      }
    
      try {
        const updatedComment = 
        await recipesData.UpdateComment(req.params.commentId,req.params.recipeId,commentInfo);
        console.log(updatedComment);
        res.json(updatedComment);
      } catch (e) {
        res.sendStatus(500);
      }
    });
      
  router.delete("/:id", async (req, res) => {
    
      try {
       const data=await recipesData.removeComment(req.params.id);
        res.json({message:"Comment Deleted"});
      } catch (e) {
        res.status(500).json({ message: "Can not delete comment" });
      }
    });
  

module.exports = router;
