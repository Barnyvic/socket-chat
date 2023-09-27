const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dataBaseConnection = async () => {
      const url = process.env.MONGODB_URL;

      try {
            await mongoose.connect(url);
            console.log('MONGODB CONNECTED...');
      } catch (error) {
            console.error(error.message);
            process.exit(1);
      }
};

module.exports = { dataBaseConnection };
