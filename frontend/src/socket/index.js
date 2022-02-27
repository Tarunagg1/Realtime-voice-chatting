import { io } from "socket.io-client";

const socketInit = ()=>{
    const  options = {
        'force new connection':true,
        reconnectionAttempt:'Infinity',
        timeout:10000,
        transport:['websocket']
    }

    return io('http://localhost:4000',options);
}


export default socketInit;


