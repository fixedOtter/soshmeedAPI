//
// made by fixedOtter on 17.8.2022
//

const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
  body: {
    type: String,
    required: true
  }
});

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;