const mongoose = require('mongoose');

const influencerSchema = new mongoose.Schema({
    influencer_id:{type:Number, required:true},
    follower_count: Number,
    avg_reach: Number,
    avg_impression: Number,
    engagement_rate: Number,
    avg_engagements_per_post: Number,
    audience_gender_split: Object,
    audience_age_split:Object,
    audience_country_top3:[String],
    audience_city_top3:[String],
    follower_growth_rate:Number,
});

module.exports = mongoose.model('Influencer', influencerSchema);