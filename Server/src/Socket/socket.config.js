import app from "../App.js";
import {createServer} from "http"
import { Server } from "socket.io";
import { addUser } from "../controllers/addUser.controller.js";
import { chatMessege } from "../controllers/chatMessege.controller.js";
import { removeUser } from "../controllers/disconnect.controler.js";



const socketServerCreate=()=>{
    try{
        const httpServer=createServer(app);
        const io=new Server(httpServer);
        return {io,httpServer};
    }
    catch(err){
        // console.log(err);
    }
}

const socketConnectionHandler=(socket,io)=>{
    // console.log("A User connected");
    socket.on("disconnect",()=>{
        removeUser(socket,io);
        // console.log('user disconnected', socket.id);
    })
    socket.on("addUser",(username)=>{
        
        addUser(username,socket,io);
        // console.log('user added', socket.id);
    })
    

    socket.on("chat-message",(chat)=>{
        chatMessege(chat,socket,io);
    })
}




export {socketServerCreate,socketConnectionHandler} ;
