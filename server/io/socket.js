
const socket = (io) => {
    io.on('connect', socket => {
        console.log('client connected');

        socket.on('disconnect', () => console.log('client discnnected'));
    })
}


module.exports = socket;