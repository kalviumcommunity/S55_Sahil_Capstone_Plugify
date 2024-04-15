const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String
});
const adminModel = mongoose.model("admincreds", adminSchema);
console.log(adminModel)
module.exports = {adminModel};