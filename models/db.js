const mongoose = require("mongoose");
const urlDb =
  "mongodb+srv://admin:admin@cluster0.wttzv.mongodb.net/tinder?retryWrites=true&w=majority";
mongoose.connect(urlDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;
module.exports = db;
