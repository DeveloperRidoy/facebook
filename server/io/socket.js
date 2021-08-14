const handleFriendEvents = require("./handlers/handleFriendEvents");

const socket = (io) => {
    io.on('connect', socket => {
        const id = socket.handshake.query.id;
        socket.join(id); 
        console.log(`client connected to room ${id}`);

        handleFriendEvents(socket, io)
        
        socket.on('disconnect', () => console.log('client discnnected'));
    })
}


module.exports = socket;