import { socketIdAndName } from "../Users/users.js"


const removeUser=(socket,io)=>{
    try {
        
        // console.log("data length before: " + socketIdAndName.length);
        socketIdAndName.filter((user) => {
            if(user.socketId === socket.id){
                socketIdAndName.pop(user);
            }
        });
        // console.log("data length after : " + socketIdAndName.length);
        
        // console.log(`user removed: ${socket.id}`);
        io.emit('deleteUser',socket.id);
    } catch (error) {
        // console.log(error);
    }
}

export { removeUser}