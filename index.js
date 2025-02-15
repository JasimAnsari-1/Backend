const express = require("express");


const app = express();

app.get("/",(req,res)=>{
    return res.send("Hello");
});
app.get("/about",(req,res)=>{
    return res.send("hello about page" + 'hey'+req.query.name + 'you are'+req.query.age);
});


app.listen(8000,()=>console.log("Server Started"));




