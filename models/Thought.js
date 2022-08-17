//
// made by fixedOtter on 17.8.2022
//

const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: false
  }
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;