const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
      ignoreQueryPrefix: true,
});

const socket = io();

socket.emit('joinRoom', { username, room });

socket.on('roomUsers', ({ room, users }) => {
      outputRoomName(room);
      outputUsers(users);
});

socket.on('message', (message) => {
      outputMessage(message);

      chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let msg = e.target.elements.msg.value;

      msg = msg.trim();

      if (!msg) {
            return false;
      }

      socket.emit('chatMessage', msg);

      e.target.elements.msg.value = '';
      e.target.elements.msg.focus();
});

function outputMessage(message) {
      const div = document.createElement('div');
      div.classList.add('message');
      const p = document.createElement('p');
      p.classList.add('meta');
      p.innerText = message.user;
      p.innerHTML += `<span>${message.time}</span>`;
      div.appendChild(p);
      const para = document.createElement('p');
      para.classList.add('text');
      para.innerText = message.message;
      div.appendChild(para);
      document.querySelector('.chat-messages').appendChild(div);
}

function outputRoomName(room) {
      roomName.innerText = room;
}

function outputUsers(users) {
      userList.innerHTML = '';
      users.forEach((user) => {
            const li = document.createElement('li');
            li.innerText = user.username;
            console.log(li.innerText);
            userList.appendChild(li);
      });
}

document.getElementById('leave-btn').addEventListener('click', () => {
      const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
      if (leaveRoom) {
            window.location = '../index.html';
      }
});
