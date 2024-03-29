const mongoose = require('mongoose');
const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');


dotenv.config();

const MONGO_DB_URI = process.env.DB_URI + "/myLocalDB";

mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    const server = http.createServer(app);
    server.listen(process.env.PORT ?? 3000);
    console.log('DB is Connected and app is listening at: '+ process.env.PORT);
  })
  .catch((error) => {
    console.log(error);
  });