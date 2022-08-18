//
// made by fixedOtter on 17.8.2022
//

const apiRouter = require('express').Router();
const { ObjectId } = require('mongodb');
const { User, Thought } = require('../models');

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
      }
    );
    res.json(user); // sending back new user
  } catch (error) {
    res.status(500).json(error);
  }
});

// create thought on soshmeed user
apiRouter.post('/thoughts', async(req, res) => {
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

// update thought on soshmeed user
apiRouter.put('/thought', async(req, res) => {
  try {
    const user = await User.findOne({ _id: ObjectId(req.body.userID) });
    const updatedThought = await Thought.findByIdAndUpdate({ _id: req.body.thoughtID})
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = apiRouter;