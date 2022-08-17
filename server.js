//
// made by fixedOtter on 17.8.2022
//

const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 6969;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/api', apiRoutes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`ears to the ground on port: ${PORT}`));
});