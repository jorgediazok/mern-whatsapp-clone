// @ts-nocheck
import React, {useState, useEffect} from 'react'
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import {IconButton,Avatar} from "@material-ui/core"
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from "../components/SidebarChat"
import db from "../firebase"
import "../styles/Sidebar.css"


function Sidebar() {

  const [rooms, setRooms] = useState([]) 

  useEffect(()=>{
   const unsubscribe = db.collection("rooms").onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    ))
    return () =>{
      unsubscribe();
    }
  },[])

  return (
    <div className="sidebar">      
        <div className="sidebar__header">
          <Avatar src="https://avatars1.githubusercontent.com/u/47897689?s=460&u=0bb395d093ce35cd806306d0c62b1d86aebfbaa1&v=4" alt="prof"/>
          
          <div className="sidebar__headerRight">
          
          <IconButton>
          <DonutLargeIcon />   
          </IconButton>
          
          <IconButton>
          <ChatIcon/>  
          </IconButton>
          
          <IconButton>
          <MoreVertIcon /> 
          </IconButton>   

        </div>
      </div>

          <div className="sidebar__search">
            <div className="sidebar__searchContainer">
              <SearchOutlined />
              <input type="text" placeholder="Search or start new chat"/>
            </div>
          </div>

          <div className="sidebar__chats">
          <SidebarChat addNewChat/>  
          {rooms.map((room)=>(
            <SidebarChat key={room.id} id={room.id} name={room.data.name} />
          ))}
          </div> 
        </div>
  )
}

export default Sidebar
