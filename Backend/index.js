import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import blogRoute from "./routes/blogRoute.js";
import commentRoute from "./routes/commentRoute.js";
import userRoute from "./routes/authUserRoute.js";

import connectdb from "./config/db.js";

dotenv.config({path:"./config/config.env"});

const app = express();
const port = process.env.PORT;

// parse options
app.use(express.json());
app.use(cors());

// Connect to MongoDB
async function main() {
  try{
    connectdb();
    
    //Routes
    app.get("/", (req, res) => {
      res.send("Hello, BlogVerse server is running...");
    });
    app.use("/api/blogs", blogRoute);
    app.use("/api/comments", commentRoute);
    app.use("/api/users", userRoute);

    app.listen(port, () => {
      console.log(`App is listening at http://localhost:${port}`);
    });
  }catch(err){
    console.log(err);
  }
}

main();

