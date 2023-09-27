/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
      {
            user: {
                  type: String,
            },
            message: {
                  type: String,
            },
            room: {
                  type: String,
            },
      },
      { timestamps: true }
);

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;
