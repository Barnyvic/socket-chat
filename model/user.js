/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
      {
            id: {
                  type: String,
            },
            username: {
                  type: String,
            },
            room: {
                  type: String,
            },
      },
      { timestamps: true }
);

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;
