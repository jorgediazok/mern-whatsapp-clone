import React,{useEffect, useState} from 'react';
import Sidebar from "./components/Sidebar"
import Chat from "./components/Chat"
import Pusher from "pusher-js"
import axios from "./axios"
import './App.css';

function App() {

  const [messages, setMessages] = useState([])

useEffect(()=>{
  axios.get("/messages/sync").then(response =>{
    setMessages(response.data)
  })
},[])

useEffect(()=>{
  const pusher = new Pusher('4b4a0c6249a061ba3cc8', {
    cluster: 'us2'
  });

  const channel = pusher.subscribe('messages');
  channel.bind('inserted', (newMessage) => {
    setMessages([...messages, newMessage])
  });

 return () => {
    channel.unbind_all();
    channel.unsubscribe();  }


},[messages])


  return (
    <div className="app">
      <div className="app__body">
      <Sidebar/>
      <Chat messages={messages}/>
      </div>     
    </div>
  );
}

export default App;
