const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const getClient = async () => {
  mongoose.connect(process.env.MONGO_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected');
  });
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('MongoDB Disconnected');
      process.exit(0);
    });
  });
};

module.exports = getClient;
