const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
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

  async getAllCommentsByRecipeId(id) {
    if (id === undefined) throw "RecipeID not fond";
            const recipesCollection = await recipes();
            const data = await this.getRecipeById(id);
            if (data === undefined) throw "Data not found";
            
            var comments=[];
            for (let i=0;i<data.comments.length;i++)
            {
              const recComData = {
                _id:id,
                recipeId: data.comments[i]._id,
                recipetitle: data.title,
                comment: data.comments[i].comment,
                poster: data.comments[i].poster,
              };
              comments.push(recComData);
            }
  
            return comments;
        },

  async getCommentByCommentId(commentid) {
        if (commentid === undefined) throw "CommentID not found";
          const recipesCollection = await recipes();
          const recipeData = await recipesCollection.find({"comments._id": commentid}).toArray();
          const data = recipeData[0];
          if (data === undefined) throw "recipe not found";
        
          var poster1 = "";
          var comment1 = "";
      
          for(let i=0;i<data.comments.length;i++)
          {
            if (data.comments[i]._id === commentid)
            {
              poster1 = data.comments[i].poster;
              comment1 = data.comments[i].comment;
              break;
          }
        }
         const commentData = {
            _id:commentid,
            recipeId:data._id,
            recipeTitle:data.title,
            poster:poster1,
            comment:comment1
          };
          return commentData;
        
      },

  async addRecipe(title, ingredients, steps) {
    if (typeof ingredients !== "string" && ingredients.length < 1) throw "No ingredients provided!";
    if(!Array.isArray(ingredients)) throw "No Ingredients found";
    if(!Array.isArray(steps)) throw "No steps found";
    // if (typeof steps !== "string" || steps.length < 1 || steps === undefined || steps == null ) throw "No steps provided!";
    for(let i = 0; i<ingredients.length; i++){
      if(typeof ingredients[i] !== "object") throw "no object found";
      if(Object.keys(ingredients[i])[0] !== "name") throw "first ingredients must be name";
      if(Object.keys(ingredients[i])[1] !== "amount") throw "first ingredients must be amount";
      if(typeof ingredients[i].name !== "string" || ingredients[i].name.trim().length<1) throw "Not valid name input";
      if(typeof ingredients[i].amount !== "string" || ingredients[i].amount.trim().length<1) throw "Not valid name input";
 }
    
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
    if(!id) throw ("ID not found");

    if(!updatedRecipe || updatedRecipe.length < 1) throw "no recipe found";
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
    if(typeof poster !== "string" && poster === undefined) throw "Poster Not found";
    if(typeof comment !== "string" && comment === undefined) throw "Comment not found";
     const commentsCollection  = await recipes();
     commentid = uuidV4()
     let addComment = {
         _id: commentid,
         poster: poster,
         comment: comment
     };
     await commentsCollection.updateOne({ _id: id }, { $push: { comments: addComment }});
     return addComment;
   },

   async UpdateComment(commentid,recipeid,updatedcomment) {
    if(commentid===undefined) throw "No CommentId found";
    if(recipeid===undefined) throw "No RecipeId found"
    
     const commentCollection = await recipes();
     const update = await this.getCommentByCommentId(commentid);
     if(update===undefined) throw "please provide valid update id";
     const updatedCommentData = {_id:commentid};
   
     if(updatedcomment.poster){
       updatedCommentData.poster = updatedcomment.poster;
     }
     if(updatedcomment.comment) {
       updatedCommentData.comment = updatedcomment.comment;
     }
   
     await commentCollection.update({_id:recipeid,"comments._id":commentid},{$set:{"comments.$":updatedCommentData}});
     console.log(updatedCommentData);
     return updatedCommentData;
    
    },

    async removeComment(id){
     
      if (id === undefined) throw "please provide valid id";

      const recipesCollection = await recipes();
      const deleteinfo = await this.getCommentByCommentId(id);
      if (!deleteinfo) throw "could not delete";
      
      const deletionInfo = await recipesCollection.removeOne({},{ $pull: { comments: {_id: id}}});
      
      if (deletionInfo.deletedCount === 0)
        throw "could not delete comment with this id";
      else {
      console.log("successfully deleted");
      }

    },
};


module.exports = exportedMethods;
// const main = async () => {
  
//       const recipe =await addRecipe("title","hi","hello");
//       console.log(recipe);
    
//   };
  
//   main();