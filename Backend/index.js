import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import blogRoute from "./routes/blogRoute.js";
import commentRoute from "./routes/commentRoute.js";
import userRoute from "./routes/authUserRoute.js";

import connectdb from "./config/db.js";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

dotenv.config({path:"./config/config.env"});

const app = express();
const port = process.env.PORT;

// Determine allowed origins based on environment
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [process.env.WEB_URL] 
  : [process.env.LOCAL_URL];

// parse options
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

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
    app.use("/api/auth", userRoute);

    app.listen(port, () => {
      console.log(`App is listening at http://localhost:${port}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
    });
  }catch(err){
    console.log(err);
  }
}

main();

