import React from 'react'
import {Avatar, IconButton} from "@material-ui/core"
import "../styles/Chat.css"
import { AttachFile, SearchOutlined, MoreVert } from '@material-ui/icons'

function Chat() {
  return (
    <div className="chat">
      <div className="chat__header">

        <Avatar />

        <div className="chat__headerInfo">
        <h3>Room Name</h3>
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
          <p className="chat__message">
           <span className="chat__name">Jorge </span>this is a message             
           <span className="chat__timestamp">
             {new Date().toUTCString()}
           </span>
          </p>
        </div>

    </div>
  )
}

export default Chat
