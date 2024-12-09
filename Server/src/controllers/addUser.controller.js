import { socketIdAndName } from "../Users/users.js"

const addUser=(username,socket,io)=>{
    try {

        const newUser={
            username,
            socketId:socket.id
        }

        socketIdAndName.push(newUser);



        // console.log(`${username} added successfully`)
        io.to(socket.id).emit("addUser",{message:`${username} added successfully`,socketIdAndName,newUser});
        io.except(socket.id).emit("addUser",newUser);

    } catch (error) {
        // console.log(error);
        io.to(socket.id).emit("error",error);
    }
}

export {addUser}