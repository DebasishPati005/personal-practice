const express = require('express');
const authRoute = require("./routers/auth.router")
const taskRoute = require("./routers/task.router")
const middleware = require("./middlewares/auth.middleware")

const app = express();
app.use(express.json());

app.use('/auth', authRoute);
app.use('/task', middleware.extractUserId,taskRoute);

module.exports = app;