const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
//const comments = require("./comments    ");
const uuidV4 = require('uuid/v4');

const exportedMethods = {
  async getAllRecipes() {
    const recipesCollections = await recipes();
    return await recipesCollections.find({}).toArray();
  },
  
  async getRecipeById(id) {
    const recipesCollections = await recipes();
    const recipe = await recipesCollections.findOne({ _id: id });

    if (!recipe) throw "Recipe not found";
    return recipe;
  },
  async addRecipe(title, ingredients, steps) {
    if (typeof title !== "string") throw "No title provided";
    if (typeof ingredients !== "string") throw "No ingredients provided!";
    if (typeof steps !== "string") throw "No steps provided!";
    

    const recipesCollections = await recipes();

    const newRecipe = {
         _id: uuidV4(),
        title: title,
        ingredients: ingredients,
        steps: steps,
        comments:[]
      
    };

    const newInsertInformation = await recipesCollections.insertOne(newRecipe);
    const newId = newInsertInformation.insertedId;
    return await this.getRecipeById(newId);
  },
  async removeRecipe(id) {
    const recipesCollections = await recipes();
    const deletionInfo = await recipesCollections.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete recipe with id of ${id}`;
    }else{

    }
  },
  async updateRecipe(id, updatedRecipe) {
    const recipesCollections = await recipes();
    const updatedRecipeData = {};

    if (updatedRecipe.title) {
      updatedRecipeData.title = updatedRecipe.title;
    }

    if (updatedRecipe.ingredients) {
      updatedRecipeData.ingredients = updatedRecipe.ingredients;
    }

    if (updatedRecipe.steps) {
      updatedRecipeData.steps = updatedRecipe.steps;
    }

    let updateCommand = {
      $set: updatedRecipeData
    };
    const query = {
      _id: id
    };
    await recipesCollections.updateOne(query, updateCommand);

    return await this.getRecipeById(id);
  },



  async addComment(id, poster, comment) {
    // if (poster === undefined || comment === undefined) return Promise.reject("You must provide an poster and comment");
     const commentsCollection  = await recipes();
     commentid = uuidV4()
     let addComment = {
         _id: commentid,
         poster: poster,
         comment: comment
     };
     const updatedInfo = await commentsCollection.updateOne({ _id: id }, { $push: { "comments": addComment }});
     const commentdata=await exportedMethods.getCommentsFromCommentId(commentid);
     return commentdata;
     
   },

   getCommentsFromCommentId(commentid) {
    if (commentid === undefined) return Promise.reject("You must provide an CommentID");
    return recipes().then((recipesCollection) => {
        return recipesCollection.findOne({ $where: "this.comments.id = '" + commentid + "'" }).then((data) => {
            if (data === 'undefined') throw "Recipe not found from CommentID";
            let recipedata = data.comments.filter(function (comments) {
                return comments._id == commentid;
            })[0];
         //   recipedata.recipeId = data._id;
         //   recipedata.reciipeTitle = data.title;
            return recipedata;
        });
    });
},

};

module.exports = exportedMethods;
// const main = async () => {
  
//       const recipe =await addRecipe("title","hi","hello");
//       console.log(recipe);
    
//   };
  
//   main();