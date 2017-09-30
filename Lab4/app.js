const todo = require("./todo");

const connection = require("./mongoConnection");

const main = async () => {
  const createdTask = await todo.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");
  console.log(createdTask);

  const createdTask1 = await todo.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");
 

const getTasks = await todo.getAllTasks();
console.log(getTasks);

const removeTask = await todo.removeTask("1053a020-a606-11e7-8c5a-87dc53dd6db7");
console.log("first task is removed");
//try{
//   return await todo.getTask("46c36520-a604-11e7-a0e7-c942f773c942");
// }catch (error){
//   console.error(error);
// }
const getAllTasks = await todo.getAllTasks();
console.log(getAllTasks);

const updatedTask = await todo.getTask("105526c0-a606-11e7-8c5a-87dc53dd6db7");
const finishedTask = await todo.completeTask(updatedTask._id); 
console.log(finishedTask);

  
};

main();
