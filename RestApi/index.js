const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./MOCK_DATA (1).json");
const { type } = require("os");
const app = express();
const PORT = 9000;

//connection
mongoose.connect('mongodb://localhost:27017/RestApi').then(()=>console.log("Mongo connected")).catch((err)=>console.log("Mongo Error",err));


//Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type: String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    jobTitle:{
        type:String
    },
    gender:{
        type:String,
    },
}
);
const User = mongoose.model("user",userSchema);

//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// app.use((req,res,next)=>{
//     console.log("Hello1");
//     next();
// });

//routes
app.get("/users",(req,res)=>{
    const html = `
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

app.get('/api/users',(req,res)=>{
    return res.json(users);
});
app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id === id);
    return res.json(user);
});


app.post('/api/users',async(req,res)=>{
    const body = req.body;
    if (
        !body||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({msg:"All Fields are required..."});
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });

    console.log(result);
    return res.status(201).json({msg:"success"});
});


app.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    users[userIndex] = { ...users[userIndex], ...req.body };
    fs.writeFile('./MOCK_DATA (1).json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error writing file" });
        }
        return res.json({ status: 'success', user: users[userIndex] });
    });
});

app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(userIndex, 1);
    fs.writeFile('./MOCK_DATA (1).json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error writing file" });
        }
        return res.json({ status: 'success', message: "User deleted" });
    });
});

app.listen(PORT,()=>console.log(`Server Started at PORT:${PORT}`))
