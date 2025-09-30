
const Brand = require("../models/Brand");
const Influencer = require("../models/Influencer");

// Compatibility scoring function
function calculateCompatibility(brand, influencer) {
  let score = 0;
  let total = 0;

  // Gender match
  total++;
  if (
    brand.target_gender === "all" ||
    influencer.audience_gender_split[brand.target_gender] > 40 // e.g., >40% audience in that gender
  ) {
    score++;
  }

  // Age range match
  total++;
  if (influencer.audience_age_split[brand.target_age_range] > 30) {
    score++;
  }

  // Country match
  total++;
  if (
    influencer.audience_country_top3 &&
    influencer.audience_country_top3.includes(brand.target_country)
  ) {
    score++;
  }

  // City match
  total++;
  if (
    influencer.audience_city_top3 &&
    influencer.audience_city_top3.includes(brand.target_city)
  ) {
    score++;
  }

  // Campaign goal match (very simple for now, just boosting engagement-type influencers)
  total++;
  if (brand.campaign_goal === "engagement") {
    if (influencer.engagement_rate > 2) score++; // arbitrary threshold
  } else if (brand.campaign_goal === "awareness") {
    if (influencer.followers_count > 10000) score++;
  }

  return (score / total) * 100; // percentage score
}

exports.checkCompatibility = async(req,res)=>{
    try{
        const {brandId} = req.params;

        const brand = await Brand.findById(brandId);
        if(!brand){
            return res.status(404).json({message:"Brand not found"});
        }
        const influencers = await Influencer.find();

        const results = influencers.map((inf)=>{
            const compatibilityScore = calculateCompatibility(brand, inf);
            return{
                influencer_id: inf.influencer_id,
                followers_count: inf.follower_count,
                engagement_rate: inf.engagement_rate,
                compatibility_score: compatibilityScore.toFixed(2)+"%",
            };
        });
        results.sort((a,b)=> parseFloat(b.compatibilityScore)-parseFloat(a.compatibilityScore));

        res.json({brand:brand.brand_name, matches:results});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}