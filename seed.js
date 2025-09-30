const mongoose  = require("mongoose");
const xlsx = require("xlsx");
const path = require("path");

mongoose.connect("mongodb://127.0.0.1:27017/InfluMatch",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console,"MongoDB connection error:"));
db.once("open",()=>{
    console.log("✅ Connected to MongoDB");
});

const influencerSchema = new mongoose.Schema({
    influencer_id: String,
    influencer_size_category: String,
    followers_count: Number,
    avg_reach: Number,
    avg_impressions: Number,
    engagement_rate: Number,
    avg_engagements_per_post: Number,
    audience_gender_split: Object,
    audience_age_split: Object,
    audience_country_top3: Object,
    audience_city_top3: Object,
    follower_growth_rate: Number,
});

const Influencer = mongoose.model("Influencer", influencerSchema, "influencers");

const csvPath = path.resolve(__dirname, "realistic_instagram_influencers.csv");
const workbook = xlsx.readFile(csvPath);
const sheetName = workbook.SheetNames[0];
const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

async function seedData(){
    try{
        await Influencer.deleteMany({});
        await Influencer.insertMany(sheetData);
        console.log("✅ Influencers inserted successfully!");
        const count = await Influencer.countDocuments();
        console.log(`📦 Total documents in InfluMatch.influencers: ${count}`);
        mongoose.connection.close();
    }catch(err){
        console.error("❌ Error seeding data:",err);
        mongoose.connection.close();
    }
}

seedData();