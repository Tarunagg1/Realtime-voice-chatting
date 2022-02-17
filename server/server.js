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
    credentials:true,
    origin:process.env.FRONT_URL
}));

app.use(router);
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Hello from express Js');
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
