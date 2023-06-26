import './App.css';
import { Auth } from './components/Auth';
import { Chats } from './components/Chats';
import { useState, useRef } from 'react';
import Cookies from "universal-cookie";
import { signOut } from 'firebase/auth';
import { auth } from './config/firebase-config';
import { AppWrapper } from "./components/AppWrapper";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const [isInChat, setIsInChat] = useState(null);

  const roomInputRef = useRef(null);

  if(!isAuth){
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <div className="App">
          <Auth setIsAuth={setIsAuth}/>
        </div>
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="room">
          <label> Type room name: </label>
          <input ref={roomInputRef} placeholder='enter room name here...' onChange={(event) => setRoom(event.target.value)} />
          <button className='btn btn-outline-success'
            onClick={() => {
              setIsInChat(true);
            }}
          >
            Enter the room
          </button>
        </div>
      ) : (
        <Chats room={room} />
      )}
    </AppWrapper>
  );
};

export default App;
