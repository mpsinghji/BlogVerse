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

// CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.WEB_URL,
      process.env.LOCAL_URL,
      'http://localhost:5173',
      'http://localhost:3000'
    ];
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600 // 10 minutes
}));

// parse options
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cookieParser());
app.use(express.json());

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
      console.log(`Allowed Origins: ${process.env.WEB_URL}, ${process.env.LOCAL_URL}, http://localhost:5173, http://localhost:3000`);
    });
  }catch(err){
    console.log(err);
  }
}

main();

