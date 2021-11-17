const fs = require('fs-extra')
const bodyParser = require('body-parser');

const express = require('express')
const app = express();
app.use(bodyParser.json())

const port = 5000;

app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})

app.post('/info' , (req , res)=>{
    const info = JSON.stringify(req.body);
    
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
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
