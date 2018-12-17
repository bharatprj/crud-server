var mongo = require("mongoose");
var Schema = mongo.Schema;

var UsersSchema = new Schema({
   name: { type: String, required: true },
   mobileNo: { type: Number },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   city: { type: String, required: true },
   gender: { type: String, required: true }
});


userModel = mongo.model('users', UsersSchema);

module.exports = userModel;