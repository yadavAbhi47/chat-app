import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../../App";




const initialState = {
    mySocketData: null,
    selectedChatindex:null,
    chats:[]
}

// chats:[{
//     user:"test",
//     socketId:"test",
//     messages:[]
// }]

const  chatSlice=createSlice({
    name:'chat',
    initialState,
    reducers:{
        setSelectedchatIdex:(state,action)=>{
            console.log("action: " + action.payload);
            state.selectedChatindex = action.payload
        },
        addMessage:(state,action)=>{
            state.selectedChat.messages.push(action.payload)
        },
        addUsers:(state,action)=>{
            const newUser ={...action.payload, messages:[]}
            const existingUserIndex = state.chats.findIndex(user => user.socketId === newUser.socketId);
            if(  existingUserIndex == -1 ){
                state.chats.push(newUser);
                console.log("Data added successfully");
                return;
            }
            console.log("Data already exists");     
        },
        setInitialUsers:(state,action)=>{
            if(state.chats.length==0){
                action.payload.forEach((user)=>{
                    if(user.socketId!=state.mySocketData.socketId){
                        state.chats.push({...user,messages:[]});
                    }
                })  
            }
        },
        setMySocketData:(state,action)=>{
            state.mySocketData = action.payload
        },
        removeUser:(state,action)=>{
            const existingUserIndex = state.chats.findIndex(user => user.socketId === action.payload);
            if(  existingUserIndex!= -1 ){
                state.chats.splice(existingUserIndex,1);
                console.log("Data removed successfully");
                return;
            }
            console.log("Data does not exists");
        },
        sentChat:(state,action)=>{
            const chat = { 
                "sender": state.mySocketData.socketId,
                "recipient":state.chats[state.selectedChatindex].socketId,
                "message": action.payload,
                 "timestamp": new Date()
                }
            state.chats[state.selectedChatindex].messages.push(chat)
            socket.emit("chat-message",{
                "recepentId":state.chats[state.selectedChatindex].socketId,
                "message":action.payload
            })
        },
        receivedChat:(state,actions)=>{
            console.log("received chat :",actions.payload);
            // {senderId: 'qT41AI0DxQ6-6q-NAAAh', message: 'adnjksdnjksd'}
            const chat = { 
                "sender": actions.payload.senderId,
                "recipient":state.mySocketData.socketId,
                "message": actions.payload.message,
                 "timestamp": new Date()
                }
            // console.log(chat)
            state.chats.filter((userData,index)=>{
                if(userData.socketId==actions.payload.senderId){
                    state.chats[index].messages.push(chat);
                }
            })

        }


    }
})

export const {
    addMessage,
    addUsers, 
    setInitialUsers,
    setMySocketData, 
    removeUser, 
    setSelectedchatIdex,
    sentChat,
    receivedChat
}=chatSlice.actions
export default chatSlice.reducer