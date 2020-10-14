import React from 'react'
import {Avatar} from "@material-ui/core"
import "../styles/Chat.css"

function Chat() {
  return (
    <div className="chat">
      <div className="chat__header">

        <Avatar />

        <div className="chat__headerInfo">
        <h3>Room Name</h3>
        <p>Last seen at...</p>  
        </div> 

        <div className="chat__headerRight"></div>

      </div>
    </div>
  )
}

export default Chat
