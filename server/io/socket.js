const handleFriendEvents = require("./handlers/handleFriendEvents");
const handleMessageEvents = require("./handlers/handleMessageEvents");

const socket = (io) => {
    io.on('connect', socket => {
        const id = socket.handshake.query.id;
        socket.join(id); 
        console.log(`client connected to room ${id}`);
        
        handleFriendEvents(socket, io);
        handleMessageEvents(socket, io);
        socket.on('disconnect', () => console.log('client discnnected'));
    })
}


module.exports = socket;