require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);

const DbConnect = require('./config/db');
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ACTIONS = require('./config/actions');

const io = require('socket.io')(server, {
    cors: {
        origin: process.env.FRONT_URL,
        methods: ['GET', 'POST'],
    },
});

DbConnect();

app.use(express.json({ limit: '8mb' }));
app.use(cookieParser());
app.use('/storage', express.static('storage'));

app.use(cors({
    credentials: true,
    origin: process.env.FRONT_URL
}));

app.use(router);
const PORT = process.env.PORT || 4000;


const socketUserMapping = {}

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
        socketUserMapping[socket.id] = user;

        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

        clients.forEach(clientId => {
            io.to(clientId).emit(ACTIONS.ADD_PEER, {
                peerId: socket.id,
                createOffer: false,
                user
            });

            socket.emit(ACTIONS.ADD_PEER, {
                peerId: clientId,
                createOffer: true,
                user: socketUserMapping[clientId]
            });
        });

        socket.join(roomId);
    });

    // handel relay ice
    socket.on(ACTIONS.RELAY_ICE, ({ peerId, iceCandidate }) => {
        io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
            peerId: socket.id,
            iceCandidate
        })
    })

    socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
        io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
            peerId: socket.id,
            sessionDescription
        })
    })


    // mute or unmute the user
    socket.on(ACTIONS.MUTE, ({ roomId, userId }) => {
        console.log('mute');
        console.log(userId);
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.MUTE, {
                peerId: socket.id,
                userId
            })
        })
    })

    socket.on(ACTIONS.UNMUTE, ({ roomId, userId }) => {
        console.log('unmute');
        console.log(userId);
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
        clients.forEach((clientId) => {
            io.to(clientId).emit(ACTIONS.UNMUTE, {
                peerId: socket.id,
                userId
            })
        })
    })





    // leaving the room 

    const leaveRoom = () => {
        const { rooms } = socket;

        Array.from(rooms).forEach((roomId) => {

            const clients = Array.from(
                io.sockets.adapter.rooms.get(roomId) || []
            );

            clients.forEach((clientId) => {
                io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
                    peerId: socket.id,
                    userId: socketUserMapping[socket.id]?.id
                })

                socket.emit(ACTIONS.REMOVE_PEER, {
                    peerId: clientId,
                    userId: socketUserMapping[clientId]?.id
                });

                socket.leave(roomId);
            });
        });
        delete socketUserMapping[socket.id];
    };

    socket.on(ACTIONS.LEAVE, leaveRoom)
    socket.on('disconnecting', leaveRoom);
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));



