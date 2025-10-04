const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  brand_name: { type: String, required: true },
  website_url: { type: String }, // added
  niche: { type: String, required: true },
  target_gender: { type: String, enum: ["male", "female", "all"], required: true },
  target_age_range: { 
    type: String, 
    enum: ["13-17","18-24","25-34","35-44","45-54","55+","all"], 
    required: true 
  },
  target_city: { type: String, required: true },
  campaign_goal: { 
    type: String, 
    enum: ["awareness", "engagement", "sales"], 
    required: true 
  },
  campaign_timeline: { type: String }, 
  influencer_size: { type: String, enum: ["nano", "micro", "mid", "macro"] } // added
});

module.exports = mongoose.model("Brand", brandSchema,"brands");
