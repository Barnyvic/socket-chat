const { DateTime } = require('luxon');

const formatMessageAndTime = (user, message) => {
      return {
            user,
            message,
            time: DateTime.local().toFormat('h:mm a'),
      };
};

module.exports = {
      formatMessageAndTime,
};
