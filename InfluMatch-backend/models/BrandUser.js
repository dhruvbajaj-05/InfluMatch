const mongoose = require("mongoose");

const brandUserSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type:String,
        required:true,
    },
},{timestamps: true});

module.exports = mongoose.model("BrandUser", brandUserSchema, "brand_users");
