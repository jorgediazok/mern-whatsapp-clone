import React,{useEffect} from 'react';
import Sidebar from "./components/Sidebar"
import Chat from "./components/Chat"
import Pusher from "pusher-js"
import './App.css';

function App() {

useEffect(()=>{
  const pusher = new Pusher('4b4a0c6249a061ba3cc8', {
    cluster: 'us2'
  });

  const channel = pusher.subscribe('messages');
  channel.bind('inserted', (data) => {
    alert(JSON.stringify(data));
  });
},[])


  return (
    <div className="app">
      <div className="app__body">
      <Sidebar/>
      <Chat />
      </div>     
    </div>
  );
}

export default App;
