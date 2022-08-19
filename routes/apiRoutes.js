//
// made by fixedOtter on 17.8.2022
//

const apiRouter = require('express').Router();
const { ObjectId } = require('mongodb');
const { User, Thought, Reaction } = require('../models');

// get all soshmeed users
apiRouter.get('/users', async(req, res) => {
  try {
    res.send(await User.find()); // grabbing all user models
  } catch (error) {
    res.status(500).json(error);
  }
});

// get one soshmeed user
apiRouter.get('/user', async(req, res) => {
  try {
    const foundUser = await User.findOne({ _id: ObjectId(req.body.userID) }).populate('thoughts').populate('friends');
    res.json(foundUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create a new soshmeed user
apiRouter.post('/user', async(req, res) => {
  try {
    const newUser = await User.create(req.body); // making new user from req body
    res.send(newUser); // sending back the new user
  } catch (error) {
    res.status(500).json(error);
  }
});

// update user stuffs
apiRouter.put('/user', async(req, res) => { 
  try {
    const user = await User.findOneAndUpdate( // finding one user and updating
      {_id: ObjectId(req.body.userID)}, // looking for user by id
      {
        username: req.body.username, // passing in username and pass from req.body
        password: req.body.password
      },
      { new: true } // specifies for us to grab the updated user - not the pre-update
    );
    res.json(user); // sending back new user
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete user
apiRouter.delete('/user', async(req, res) => {
  try {
    const delUser = await User.findOneAndDelete({ _id: ObjectId(req.body.userID) }); // deleting user from req body
    const thoughts = await Thought.deleteMany({ _id: { $in: delUser.thoughts }}); // deleting the thoughts from the user
    await Reaction.deleteMany({ _id: { $in: thoughts.reactions }}); // deleting the reactions from all the thoughts
    res.send(delUser); // sending back the del data
  } catch (error) {
    res.status(500).json(error);
  }
});

// create thought on soshmeed user
apiRouter.post('/thought', async(req, res) => {
  try {
    const user = await User.findOne({ _id: ObjectId(req.body.userID) }); // looking for user by req id
    const newThought = await Thought.create({title: req.body.title, body: req.body.body })
    user.thoughts.push(newThought._id); // pushing new thought to the user's thought array (following the thought schema)
    user.save(); // saving changes to user
    res.json(user); // responding with newly updated user
  } catch (error) {
    res.status(500).json(error);
  }
});

// read thought by id
apiRouter.get('/thought', async(req, res) => {
  try {
    const thought = await Thought.findOne({ _id: ObjectId(req.body.thoughtID) }).populate('reactions');
    res.send(thought);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update thought on soshmeed user
apiRouter.put('/thought', async(req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate( // finding thought by id
      { _id: req.body.thoughtID}, // filter condition is thought id
      {
        title: req.body.title, // updating title && body from req.body
        body: req.body.body
      },
      { new: true } // sending back the updated thought obj
    );
    res.json(updatedThought);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete thought by id
apiRouter.delete('/thought', async(req, res) => {
  try {
    const delThought = await Thought.findOneAndDelete({ _id: ObjectId(req.body.thoughtID) }); // deleting thought from req body
    await React.deleteMany({ _id: { $in: delThought.reactions }}); // deleting the reactions from the thought
    res.send(delThought); // sending back the deleted thought
  } catch (error) {
    res.status(500).json(error);
  }
});

// add friend to user
apiRouter.put('/friend', async(req, res) => {
  try {;
    const user = await User.findOne({_id: ObjectId(req.body.userID)});
    user.friends.push(req.body.friendID);
    await user.save();
    res.json(user); // sending back updated user
  } catch (error) {
    res.status(500).json(error);
  }
});

// remove friend from user
apiRouter.delete('/friend', async(req, res) => {
  try {
    const user = await User.findOne({_id: ObjectId(req.body.userID)});
    user.friends.remove(req.body.friendID);
    await user.save();
    res.json(user); // sending back updated user
  } catch (error) {
    res.status(500).json(error);
  }
});



module.exports = apiRouter;