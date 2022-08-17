//
// made by fixedOtter on 17.8.2022
//

const { Schema, model, SchemaTypes } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  thoughts: [{
    type: SchemaTypes.ObjectId,
    ref: 'Thought'
  }],
  friends: [{
    type: SchemaTypes.ObjectId,
    ref: 'User'
  }]
}, {
  toJSON: {
    virtuals: true // include any virtual properties on a client side request
  }
});

userSchema.virtual('thoughtCount').get(function () {
  return this.thoughts.length;
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
})

const User = model('User', userSchema);

// User.deleteMany({}).then(() => console.log('users deleted.'))

module.exports = User;