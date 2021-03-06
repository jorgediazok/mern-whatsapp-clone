const express = require('express');
const mongoose = require('mongoose');
const Messages = require("./models/dbMessages")
const Pusher = require("pusher")
const cors = require("cors")
require('dotenv/config');


//app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
  appId: '1090640',
  key: '4b4a0c6249a061ba3cc8',
  secret: process.env.REACT_APP_PUSHER,
  cluster: 'us2',
  useTLS: true
});

//middleware
app.use(express.json())
app.use(cors())
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "*")
  next()
})

//DB config

mongoose.connect(
  process.env.REACT_APP_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('conected to DB');
    const msgCollection = db.collection("messages")
    const changeStream = msgCollection.watch()

    changeStream.on("change", (change)=>{
      if(change.operationType === "insert"){
        const messageDetails = change.fullDocument;
        pusher.trigger("messages", "inserted", {
          name: messageDetails.name,
          message: messageDetails.message,
          timestamp: messageDetails.timestamp, 
          received: messageDetails.received
        })
      } else{
        console.log("Error triggering Pusher")
      }
    })
  }
);

const db = mongoose.connection;
db.once("open", ()=>{
  console.log("DB is connected")
})

//api routes
app.get("/", (req,res,next)=>{
  res.status(200).send("hello world")
})

app.get("/messages/sync", (req,res,next)=>{
  Messages.find((err,data)=>{
    if(err){
      res.status(500).send(err)
    }else{
      res.status(200).send(data)
    }
  })
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