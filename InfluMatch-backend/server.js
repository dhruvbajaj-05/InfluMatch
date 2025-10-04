const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const brandRoutes = require("./routes/brandRoutes");
const compatibilityRoutes = require("./routes/compatibilityRoutes");
const brandAuthRoutes = require("./routes/brandAuthRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/InfluMatch").then(()=>
console.log("✅ Connected to MongoDB")).catch((err)=>
console.log("❌ Connection error:",err));

app.use("/api/brands", brandRoutes);
app.use("/api/compatibility", compatibilityRoutes);
app.use("/api/brand-auth", brandAuthRoutes);

app.listen(5000,()=> console.log("✅ Server running on port 5000"));
