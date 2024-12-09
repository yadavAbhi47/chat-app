import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, receivedChat, sentChat } from './Store/slices/ChatSlice';
import { socket } from '../App';




const ChatSection = () => {
    const [ inputMessege,setInputMessege]=useState("");
    const dispatch=useDispatch();
    
    const selectedChatindex=useSelector(state=>state.chatReducer.selectedChatindex);    
    const messages=useSelector(state=>state.chatReducer.chats[selectedChatindex]?.messages) ;
    const senderName=useSelector(state=>state.chatReducer.chats[selectedChatindex]?.username)
    const mySocketData=useSelector(state=>state.chatReducer.mySocketData)
    const sendHandler = () => {
        if(inputMessege){
            dispatch(sentChat(inputMessege));
            setInputMessege("");
        }
    };

    

      
   
  
    useEffect(() => {
      window.scrollTo(0,document.body.scrollHeight);
    }, [messages]);


    return (
        <div className="bg-gray-100 p-4 mb-20" >
            <div className="flex flex-col space-y-4">
                {messages?.map((chat, index) => (
                    <div key={index} className={`p-2 rounded ${chat.sender ===mySocketData.socketId? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
                        <p className="font-semibold">{chat.sender === mySocketData.socketId ? 'You' : senderName}</p>
                        <p>{chat.message}</p>
                        <p className="text-sm text-gray-500">{chat.timestamp.toLocaleString()}</p>
                    </div>
                ))}
            </div>
            <div className="flex mb-4 fixed bottom-2 left-5 md:left-72 right-5">
                <input type="text" className="flex-grow border border-gray-300 rounded-l p-2 focus:outline-none" value={inputMessege} placeholder="Type your message..." onChange={(e)=>{setInputMessege(e.target.value)}} onKeyDown={(e)=>{if(e.key=="Enter" && inputMessege) sendHandler()}}/>
                <button className="bg-blue-500 text-white rounded-r px-4 py-2 ml-2" onClick={sendHandler}>Send</button>
            </div>
        </div>
    );
};

export default ChatSection;