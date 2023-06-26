import { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, where, query, orderBy, or } from 'firebase/firestore';
import { dataBase, auth } from '../config/firebase-config';
import "../styles/Chats.css";

export const Chats = (props) =>{
    const { room } = props;

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(dataBase, "messages");

    useEffect(() =>{
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy("dateCreated"));
        const unsuscribe = onSnapshot(queryMessages, (snapshot) =>{
            let messages = [];
            snapshot.forEach((doc) =>{
                messages.push({...doc.data(), id: doc.id});
            });
            setMessages(messages);
        });
        
        return () => unsuscribe();//cleaning up useEffect
    }, []);

    const submitHandler = async(event) => {
        event.preventDefault();

        if(newMessage === "") return;

        await addDoc(messagesRef, {
            message: newMessage,
            dateCreated: serverTimestamp(),
            username: auth.currentUser.displayName,
            room,
        });

        setNewMessage("");      
    };

    return(
        <div className='chat-app'>
            <div className='header'>
                <h1>welcome to {room.toUpperCase()}</h1>
            </div>
            <div className='messages'>
                {messages.map((text) => (
                    <div className='message' key={text.id}>
                        <span className='user'>{text.username}:  </span>
                        {text.message}
                        {console.log(text.message)}
                    </div>
                    )
                )}
            </div>
            <form className='new-message-form' onSubmit={submitHandler}>
                <input 
                    className='new-message-input'
                    placeholder='type your message here...'
                    onChange={(event) => setNewMessage(event.target.value)}
                    value={newMessage}/>
                <button 
                    className='send-button'
                    type='submit'>Send</button>
            </form>
        </div>
    );
};