// build your server here and require it from index.js
const express = require('express');

const server = express();

const projectRouter = require('./project/router.js');
const resourceRouter = require('./resource/router.js');
const taskRouter = require('./task/router.js');

server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/resources', resourceRouter);
server.use('/api/tasks', taskRouter);
server.use('*', (req, res) => {
    res.status(404).json("Page not found.");
})

module.exports = server;