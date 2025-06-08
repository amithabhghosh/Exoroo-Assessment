const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const postRoute = require("./Routes/postRoute");
const userRoute = require("./Routes/userRoute");
require("dotenv").config();


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


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/posts", postRoute);
app.use("/api/user", userRoute);


connectDb();
app.listen(5000, () => {
  console.log("Server Connected");
});
