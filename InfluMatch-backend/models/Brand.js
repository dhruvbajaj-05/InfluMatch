const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brand_name:{type:String, required:true},
    niche:String,
    target_gender:{type:String, enum:['male','female','all'], required:true},
    target_age_range:{type:String, enum:['18-24','25-34','35-44','45-54','55+'], required:true},
    target_country: String,
    target_city: String,
    campaign_goal: {type:String, enum:['awareness', 'engagement'], required:true}
});

module.exports = mongoose.model('Brand', brandSchema);
