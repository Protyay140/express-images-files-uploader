const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const cors = require('cors');


app.use(cors());
app.use(express.static('public/Images'));
app.use(express.static('public/css'));

const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        cb(null,"public/Images");
    },
    filename : (req,file,cb) => {
        // console.log(file);
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage : storage});

app.set("view engine","ejs");
app.get('/',(req,res)=>{
    res.render("upload");
})
// app.get('/',(req,res)=>{
//     res.send("hello world...");
// })
app.post("/upload",upload.single('image'),(req,res)=>{
    // res.send(`<h1>...Image is uploaded...</h1>`)
    // res.render('uploded');
    // res.redirect('upload')
    res.status(200).json({
        msg : "image is successfully uploaded ..."
    })
})

app.get("/getImages",(req,res)=>{
    let fileList = [];
  
    fs.readdirSync('public/Images').forEach(file => {
        // console.log(file);
        fileList.push(file)
      });
    // console.log(fileList);
    res.status(200).json({
        fileList
    })
})

const port = 3000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})