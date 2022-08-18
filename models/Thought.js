//
// made by fixedOtter on 17.8.2022
//

const { Schema, model, SchemaTypes } = require('mongoose');

const thoughtSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: false
  },
  reactions: [{
    type: SchemaTypes.ObjectId,
    ref: 'Reaction'
  }],
}, {
  toJSON: {
    virtuals: true // include any virtual properties on a client side request
  },
  id: false // disabling the virtual id being tacked on, since I find it annoying to have two id's
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;