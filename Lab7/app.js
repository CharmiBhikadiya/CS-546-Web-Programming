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

    //  const comment =await recipes.addComment("ce05c39e-7e9f-46dd-a945-3b7eef5d40b4","charmi bhikadiya","recipe 1 is very good");
    //  console.log(comment);

    // const recipe = await recipes.getAllRecipes();
    // console.log(recipe);

    //  const recipe =await recipes.getCommentsFromCommentId("d0557d00-70ef-4f6f-bf9b-52366c21b706");
    //  console.log(recipe);


//       const result=await recipes.getRecipeById("ce05c39e-7e9f-46dd-a945-3b7eef5d40b4");
//       console.log(result);
//    };
  
main();

app.listen(3003, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:30002");
});
