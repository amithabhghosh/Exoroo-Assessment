const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const postRoute = require("./Routes/postRoute");
const userRoute = require("./Routes/userRoute");
require("dotenv").config();

// ✅ Connect to MongoDB
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// ✅ CORS middleware — must come BEFORE routes
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Your routes
app.use("/api/posts", postRoute);
app.use("/api/user", userRoute);

// ✅ Start server
connectDb();
app.listen(5000, () => {
  console.log("Server Connected");
});
