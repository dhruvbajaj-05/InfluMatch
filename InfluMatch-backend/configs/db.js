const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/InfluMatch",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });

        console.log("✅ MongoDb connected");
    }catch(err){
        console.log("❌ DB connection error:",err.message);
        process.exit(1);
    }
};

module.exports = connectDB;