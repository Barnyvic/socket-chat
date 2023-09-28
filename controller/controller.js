const MessageModel = require('../model/message');
const UserModel = require('../model/user');

async function userJoin(id, username, room) {
      const existingUser = await UserModel.findOne({ username, room });

      console.log(existingUser);

      if (existingUser) {
            return existingUser;
      }

      const user = new UserModel({ id, username, room });

      await user.save();
      return user;
}

async function getCurrentUser(id) {
      return await UserModel.findOne({ id });
}

async function userLeave(id) {
      return await UserModel.findOneAndDelete({ id: id });
}

async function getRoomUsers(room) {
      return await UserModel.find({ room });
}

async function saveUserMessage(user, message, room) {
      const messageModel = new MessageModel({ user, message, room });
      await messageModel.save();
      return messageModel;
}

module.exports = {
      userJoin,
      getCurrentUser,
      userLeave,
      getRoomUsers,
      saveUserMessage,
};
