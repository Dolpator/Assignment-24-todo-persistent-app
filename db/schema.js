const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// DATA TABLE
// ----------------------
const taskListSchema = new Schema({
  // example of optional fields
  task:         { type: String, required: true },
  completed:    { type: String },
  createdAt:    { type: Date, default: Date.now}

})



module.exports = {
   /*
    * NOTE: you would ideally change the export-value and the model-name
    */
  TaskList: createModel('TaskList', taskListSchema)
}
