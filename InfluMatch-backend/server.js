const express = require("express");
const connectDB = require("./configs/db");

const brandRoutes = require("./routes/brandRoutes");
const compatibilityRoutes = require("./routes/compatibilityRoutes");

const app = express();

// Middleware
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/brands", brandRoutes);
app.use("/compatibility", compatibilityRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
