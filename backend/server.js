const express = require('express');
const mongoose = require('mongoose');
const Messages = require("./models/dbMessages")
require('dotenv/config');


//app config
const app = express()
const port = process.env.PORT || 9000

//middleware
app.use(express.json())

//DB config

mongoose.connect(
  process.env.REACT_APP_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('conected to DB');
  }
);


//api routes
app.get("/", (req,res,next)=>{
  res.status(200).send("hello world")
})

app.post("/messages/new", (req,res,next)=>{
  const dbMessage = req.body

  Messages.create(dbMessage, (err, data)=>{
    if(err){
      res.status(500).send(err)
    }else{
      res.status(201).send(data)
    }
  })
})



//listen
app.listen(port, ()=>console.log(`Listening on localhost: ${port}`))