const http = require("http");
const fs = require("fs");
const url =  require("url");



const myServer = http.createServer((req,res) => {
    if (req.url === "/favicon.ico")return res.end();
    const log = `${Date.now()}: ${req.url} New Req Recieved\n`;
    const myUrl = url.parse(req.url);
    console.log(myUrl);
    fs.appendFile("log.txt",log,(err,data) =>{
        switch(req.url){
            case "/": res.end("HomePage");
            break
            case "/about":res.end("I am Jasim");
            break;
            default:
                res.end("404 Not Found");
        }
    })
});
myServer.listen(8000, ()=> console.log("Server Started"));





