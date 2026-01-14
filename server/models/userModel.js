const mongoose= require("mongoose");
const userSchema= new mongoose.Schema({
     name:String,
     email:String,
     password:String,
       resetToken: String,
  resetExpire: Date,
})
module.exports = mongoose.model("user", userSchema);