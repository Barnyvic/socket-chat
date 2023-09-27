const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const initializeSocket = require('./controller/socket');
const { dataBaseConnection } = require('./database/database');
require('dotenv').config();

const PORT = 3000 || process.env.PORT;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


initializeSocket(io);

server.listen(PORT, async () => {
      await dataBaseConnection();
      console.log(`Server listening on port ${PORT}`);
});
