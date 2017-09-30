const mongoCollections = require("./mongoCollections");
const todo = mongoCollections.todoItems;
const uuidv1 = require('uuid/v1');

module.exports = {
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!
  async getTask(id) {
    if (!id) throw "You must provide an id to search for";

    const taskCollection = await todo();
    const task = await taskCollection.findOne({ _id: id });
    if (task === null) throw "No task with that id";

    return task;
  },

  async getAllTasks() {
    const taskCollection = await todo();

    const task = await taskCollection.find({}).toArray();

    return task;
  },

  async createTask(title, description) {
    if (!title || typeof title !== 'string') 
    throw "You must provide a valid formate of title for your task";

    if(!description || typeof description !== 'string')
    throw "You must provide a valid formate of description for your task "
   
    const taskCollection = await todo();

    let newtask = {
      _id:uuidv1(),
      title: title,
      description: description,
      completed:false,
      completedAt:null
    };

    const insertInfo = await taskCollection.insertOne(newtask);
    if (insertInfo.insertedCount === 0) throw "Could not add dog";

    const newId = insertInfo.insertedId;

    const task = await this.getTask(newId);
    return task;
  },
  async removeTask(id) {
    if (!id) throw "You must provide an id to search for";

    const taskCollection = await todo();
    const deletionInfo = await taskCollection.removeOne({ _id: id });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete task with id of ${id}`;
    }
  },
  async completeTask(taskId) {
    if (!taskId) throw "You must provide an id to search for";

    const taskCollection = await todo();
    const updatedTask = {
      $set:{
      completed: true,
      completedAt: Date.now()
      }
      
    };

    const updatedInfo = await taskCollection.updateOne({ _id: taskId }, updatedTask);
    if (updatedInfo.modifiedCount === 0) {
      throw "could not update task successfully";
    }

    return await this.getTask(taskId);
  }
};

