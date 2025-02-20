const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA (1).json");
const app = express();
const PORT = 9000;

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


app.post('/api/users',(req,res)=>{
    const body = req.body;
    users.push({...body, id: users.length+1});
    fs.writeFile('./MOCK_DATA (1).json',JSON.stringify(users),(err,data)=>{
    return res.status(201).json({status:'success',id: users.length + 1});
    })
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
