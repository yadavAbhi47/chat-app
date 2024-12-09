


const chatMessege=(chat,socket,io)=>{
    try{
      // console.log(chat);
      // console.log(socket.id);
      io.to(chat.recepentId).emit('chat-message',{senderId:socket.id, message:chat.message});
      // console.log("Messege Sent!");
      }
      catch(error){
        // console.log(error);
      }
}

export {chatMessege}