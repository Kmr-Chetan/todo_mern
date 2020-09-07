const express = require("express");
const mongoose = require("mongoose");
const config = require('config');


const app = express();

// Bodyparse Middleware
app.use(express.json());

const db = require("./config/key");


// Connect to mongo
 db
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
