const config = require('./config/config');
const connection = require('./connection/connect');
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const route = require('./v1/controller/route');
const path=require('path')
const server = require('http').createServer(app);


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static   ("views"));
app.use(bodyParser.urlencoded({

    extended:true
}));
app.use(bodyParser.json() )
//  const multer = require("multer");
//  app.use(multer().array())

connection.connect.on('open',(err)=>{
 console.log('database connected successfully');
})

app.listen(config.port,(err)=>{

    if(err) throw (err)

    console.log(`connection is running on ${config.port}`);
})

  app.use('/api',route);