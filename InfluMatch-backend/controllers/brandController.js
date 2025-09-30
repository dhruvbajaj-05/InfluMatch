const Brand = require('../models/Brand');

exports.createBrand = async (req,res)=>{
    try{
        const brand = await Brand.create(req.body);
        await brand.save();
        res.status(201).json({message:"✅ Brand created", brand});
    }catch(err){
        res.status(400).json({error:err.message});
    }
};
