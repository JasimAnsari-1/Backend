const http = require("http");
const express = require("express");


const app = express();

app.get("/",(req,res)=>{
    return res.send("Hello");
});
app.get("/about",(req,res)=>{
    return res.send("hello about page")
});


const myServer = http.createServer(app);
myServer.listen(8000, ()=> console.log("Server Started"));





