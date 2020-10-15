import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"
import {Avatar} from "@material-ui/core"
import "../styles/SidebarChat.css"

function SidebarChat({addNewChat, id, name}) {

  const [seed, setSeed] = useState("")

  useEffect(() => {
    // @ts-ignore
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter namer for chat");
    if(roomName){
    //do some stuff  
    
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
     <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
     <div className="sidebarChat__info">
      <h2>{name}</h2>
      <p>This is the last message</p> 
      </div> 
    </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  )
}

export default SidebarChat
