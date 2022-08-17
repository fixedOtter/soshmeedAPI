//
// made by fixedOtter on 17.8.2022
//

const apiRouter = require('express').Router();
const { User, Thought } = require('../models');

// create a new soshmeed user
apiRouter.post('/user', async(req, res) => {

  const newUser = await User.create(req.body);

  res.send(newUser);

});

// get all soshmeed users
apiRouter.get('/users', async(req, res) => {
  res.send(await User.find());
});

// create post on soshmeed user
apiRouter.post('/thoughts', async(req, res) => {
  const user = await User.findOne({ _id: req.body.userID });

  user.thoughts.push({ title: req.body.thoughtTitle, body: req.body.thoughtBody });
  user.save();

  res.send(user);
});