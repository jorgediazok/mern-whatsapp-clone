// @ts-nocheck
import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import {Avatar, IconButton} from "@material-ui/core"
import "../styles/Chat.css"
import { AttachFile, SearchOutlined, MoreVert } from '@material-ui/icons'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import db from "../firebase"
import axios from "../axios"

function Chat({messages}) {
  const [seed, setSeed] = useState("")
  const [input, setInput] = useState("")
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState("")

  useEffect(()=>{
    if(roomId){
      db.collection("rooms").doc(roomId).onSnapshot(snapshot=>(
          setRoomName(snapshot.data().name)
      ))
    }
  },[roomId])

  useEffect(() => {
    // @ts-ignore
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);


  const sendMessage = async (e) =>{
    e.preventDefault();
    await axios.post("/messages/new", {
      message: input,
      name: "Jorge",
      timestamp: "now",
      received: false
    })
    setInput("")
  }


  return (
    <div className="chat">
      <div className="chat__header">

        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

        <div className="chat__headerInfo">
        <h3>{roomName}</h3>
        <p>Last seen at...</p>  
        </div> 

        <div className="chat__headerRight">
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <IconButton>
          <AttachFile/>
        </IconButton>
        <IconButton>
          <MoreVert/>
        </IconButton>
        </div>

      </div>

      <div className="chat__body">
          {messages.map(message=>(
            <p key={message.message} className={`chat__message ${message.received && "chat__receiver"}`}>
            <span className="chat__name">{message.name}</span>{message.message}             
            <span className="chat__timestamp">
              {message.timestamp}
            </span>
           </p>
          ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon/>
        <form>
          <input value={input} onChange={e=> setInput(e.target.value)} type="text" placeholder="Type a message"/>
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>

    </div>
  )
}

export default Chat
