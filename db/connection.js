//
// made by fixedOtter on 17.8.2022
//

const mongoose = require('mongoose');
isProd = process.env.NODE_ENV

const uri = isProd ? process.env.mongoURI : 'mongodb://127.0.0.1:27017/soshmeedPlayground';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = mongoose.connection;
