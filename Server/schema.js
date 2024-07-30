const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    img_url: String,
    contact_no: Number,
    price_per_min: Number,
    google_maps_link: String,
    charge_type: String,
    pin_code: Number,
    created_by: String
});

const userModel = mongoose.model("plugifycollections", userSchema);

module.exports = { userModel };
