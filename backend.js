const path = require('path');
const fs = require('fs-extra');
const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express')
const app = express();
app.use(bodyParser.text())
app.use(cors())

const port = 5000;

app.get('/weirdo' , (req , res)=>{
    if(req.headers["if-modified-since"]) {
        res.setHeader('cached', 'true');
        res.setHeader('access-control-expose-headers', '*');
    }
    res.sendFile(path.join(__dirname, "/public/weirdo/weirdo.js"), err => console.log(err));
})

app.post('/info' , (req , res)=>{
    const info = JSON.stringify(JSON.parse(req.body));

    const ip = req.socket.remoteAddress;
    const date = new Date();
    const filename = `./testing-range/bodies/${ip}-${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.json`
    fs.outputFile(filename, info, { recursive: true }, function (err) {
        if(err) return console.log(err);
        res.sendStatus(200);
    });
})

app.listen(port, () => {
    console.log("Now listening...");
})
