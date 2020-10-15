import React,{useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Chat from "./components/Chat"
import Login from "./components/Login"
import Pusher from "pusher-js"
import axios from "./axios"
import './App.css';

function App() {
const [user, setUser] = useState(null)
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
      {!user ? (
        <Login />
      ) : (
      <div className="app__body">
      <Router>        
      <Sidebar/>
      <Switch>
        <Route path="/rooms/:roomId">           
          <Chat messages={messages}/>
        </Route>
     
          <Route path="/">
              <Chat messages={messages}/>
          </Route>

        </Switch>      
      </Router>      
      </div>
      )}     
    </div>
  );
}

export default App;
