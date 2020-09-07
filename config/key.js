const mongoose = require("mongoose");

const db = mongoose.connect("`mongodb://localhost:27017/todo", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

module.exports = db;
