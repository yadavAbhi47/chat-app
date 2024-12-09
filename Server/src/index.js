
import dotenv from 'dotenv'
import { socketConnectionHandler, socketServerCreate } from './Socket/socket.config.js';  


dotenv.config();

export const {io,httpServer}=socketServerCreate();
io.on('connection',(socket)=>{
    socketConnectionHandler(socket,io);
});



httpServer.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
})