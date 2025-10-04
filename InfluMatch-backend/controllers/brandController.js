const Brand = require('../models/Brand');

exports.createBrand = async (req,res)=>{
    try{
        console.log("📩 Incoming brand payload:", req.body);
        const brand = await Brand.create(req.body);
        await brand.save();
        res.status(201).json({message:"✅ Brand created", brand});
    }catch(err){
        console.error("❌ Create brand error:", err.message);
        res.status(400).json({error: err.message});
    }
};
