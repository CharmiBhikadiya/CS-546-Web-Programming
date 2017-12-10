const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const configRoutes = require("./routes");
const recipes = require("../Lab7/data/recipes");


app.use(bodyParser.json());
configRoutes(app);

const main = async () => {
  
    //   const recipe =await recipes.addRecipe("recipe 1","incredients 1","steps 1");
    //   console.log(recipe);

    //  const comment =await recipes.addComment("2802c0df-556d-499c-9d53-61971385184d","charmi bhikadiya","biryani 2 is very good");
    //  console.log(comment);

    // const recipe = await recipes.getAllRecipes();
    // console.log(recipe);

    //  const recipe =await recipes.getCommentByCommentId("e94c3065-90d1-446b-a712-69d6c85d38e8");
    //  console.log(recipe);


//       const result=await recipes.getRecipeById("ce05c39e-7e9f-46dd-a945-3b7eef5d40b4");
//       console.log(result);

    // const deletedComment = await recipes.removeComment();
    // console.log(deletedComment);

    // const getcommentsbyid = await recipes.getAllCommentsByRecipeId("01fd170f-ee61-4e31-8179-1970a942e6b1");
    // console.log(getcommentsbyid);
   
};


main();


app.listen(3003, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3003");
});

