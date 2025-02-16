const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA (1).json");
const app = express();
const PORT = 7000;

//middleware
app.use(express.urlencoded({extended:false}));

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


app.post('/api/users',(req,res)=>{
    const body = req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile('.MOCK_DATA (1).json',JSON.stringify(users),(err,data)=>{
    return res.json({status:'success',id: users.length + 1});
    })
});


app.patch('/api/users/:id',(req,res)=>{
    //edit user
    return res.json({status: "pending"});
});

app.delete('/api/users/:id',(req,res)=>{
    //delete user
    return res.json({status: "pending"});
});


app.listen(PORT,()=>console.log(`Server Started at PORT:${PORT}`))
