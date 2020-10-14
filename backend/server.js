const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');


//app config
const app = express()
const port = process.env.PORT || 9000

//middleware


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

//listen
app.listen(port, ()=>console.log(`Listening on localhost: ${port}`))