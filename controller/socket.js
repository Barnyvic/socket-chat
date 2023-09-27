// socket.js

const { formatMessageAndTime } = require('../helper/formatMessage');
const {
      userJoin,
      getCurrentUser,
      userLeave,
      getRoomUsers,
      saveUserMessage,
} = require('./controller');

const initializeSocket = (io) => {
      io.on('connection', (socket) => {
            console.log('a user connected', socket.id);

            const botName = 'Chat-Buddy';

            socket.on('joinRoom', async ({ username, room }) => {
                  const user = await userJoin(socket.id, username, room);

                  socket.join(user.room);

                  socket.emit(
                        'message',
                        formatMessageAndTime(botName, `Welcome to ${botName}`)
                  );

                  socket.broadcast
                        .to(user.room)
                        .emit(
                              'message',
                              formatMessageAndTime(
                                    botName,
                                    `${user.username} has joined the chat`
                              )
                        );

                  io.to(user.room).emit('roomUsers', {
                        room: user.room,
                        users: await getRoomUsers(user.room),
                  });
            });

            socket.on('chatMessage', async (msg) => {
                  const user = await getCurrentUser(socket.id);
                  await saveUserMessage(user.username, msg, user.room);

                  io.to(user.room).emit(
                        'message',
                        formatMessageAndTime(user.username, msg)
                  );
            });

            socket.on('disconnectUser', async (username) => {
                  console.log(username.username, 'THIS IS POWER');
                  const user = await userLeave(username);
                  if (user) {
                        io.to(user.room).emit(
                              'message',
                              formatMessageAndTime(
                                    botName,
                                    `${user.username} has left the chat`
                              )
                        );

                        io.to(user.room).emit('roomUsers', {
                              room: user.room,
                              users: await getRoomUsers(user.room),
                        });
                  }
            });

            socket.on('disconnect', async () => {});
      });
};

module.exports = initializeSocket;
