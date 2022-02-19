const express=require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path=require("path");
const cors=require("cors");
const multer = require("multer");
const authRoute = require("./src/routes/Authoriztion");
const catRoute = require("./src/routes/Categories");
const postRoute = require("./src/routes/Posts");


const PORT='5000';

const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

dotenv.config();
const url = process.env.MONGO_URL;
//mongodb://localhost:27017/blog
mongoose
  .connect(url)
  .then(()=>console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.static('./build/'))
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

  app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname + '/build/index.html'));
  });

//Routes used for blog
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", catRoute);



app.listen(5000,()=>console.log(`Server is running at PORT NO: ${PORT}`));