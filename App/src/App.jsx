

import React, { useEffect, useState } from 'react';
import { Header, Navbar, ChatSection } from "./components"
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { addUsers, receivedChat, removeUser, setInitialUsers, setMySocketData, setSelectedchatIdex } from './components/Store/slices/ChatSlice';

let socket;
try {
  (async() => {
    socket =await io.connect(import.meta.env.VITE_BASE_URL, { transports: ['websocket'] })
  })()
}
catch (e) {
  console.error("Error connecting to the socket", e);
}
export { socket }
const App = () => {
  const dispatch = useDispatch();
  const selectedChatindex = useSelector(state => state.chatReducer.selectedChatindex);
  const [userName, setUserName] = useState("");
  useEffect(() => {


    try {
      socket.on("addUser", (data) => {

        if (data.message) {

          dispatch(setMySocketData(data.newUser));
          dispatch(setInitialUsers(data.socketIdAndName));
        } else {
          dispatch(addUsers(data));
          // console.log(data);
        }
      });

    } catch (error) {
      console.error("something went wrong during on event of addUser", error);
    }
    try {
      socket.on("deleteUser", (socketId) => {
        dispatch(removeUser(socketId));
        // console.log("A user has been removed")
        dispatch(setSelectedchatIdex(null));
      });

    } catch (error) {
      console.error("something went wrong during on event of removeUser", error);
    }
    try {
      socket.on("chat-message", (data) => {
        dispatch(receivedChat(data));
      })

    } catch (error) {
      console.error("something went wrong during on event of chatMessage", error);
    }


  }, []);

  useEffect(() => {
    if (userName) {
      // console.log("userName: ", userName);
      socket.emit("addUser", userName);
    }
  }, [userName]);




  if (!userName) {
    return (
      <div className="flex justify-center h-screen items-center">
        <form className="max-w-md w-full">
          <div className="flex items-center space-x-2">
            <input type="text" placeholder="Enter Your UserName" className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" id='userName' />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={(e) => { e.preventDefault(); setUserName(document.getElementById("userName").value.trim()) }}>Enter</button>
          </div>
        </form>
      </div>
    );

  }



  return (
    <div className="flex">
      <Navbar />
      <div className='flex-grow'>
        <Header />
        {
          selectedChatindex == null ?
            <div className="md:flex justify-center hidden items-center h-screen">
              <h1 className="text-3xl text-center">
                Welcome to Ichat Messaging Duniya
                <span role="img" aria-label="heart emoji"> ❤️❤️❤️❤️❤️</span>
              </h1>
            </div>
            : <ChatSection />
        }


      </div>
    </div>
  );
};

export default App;
