const mongoose = require("mongoose");
const { Schema } = mongoose;
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const user = new Schema(
  {
    userName: { type: String, min: 5, max: 30, require: true },
    password: { type: String, min: 5, max: 20, require: true },
    birthDay: { type: Date, require: true },
    email: { type: String, require: true },
    gender: { type: String, require: true },
    hobbies: String,
    description: String,
    avatars: Array,
    slug: { type: String, slug: "userName", unique: true },
    createdAt: { type: Date, Default: Date.now },
    updatedAt: { type: Date, Default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", user);
