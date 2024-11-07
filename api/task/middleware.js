const TASKS = require('./model.js');
const PROJECTS = require('../project/model.js');

const checkTaskId = (req, res, next) => {
    TASKS.getById(req.params.id)
        .then(task => {
            if(task.length) {
                next();
            } else {
                throw Error(`No Task found with id ${req.params.id}`)
            }
        })
        .catch(err => {
            err.status = 404;
            next(err);
        })
}

const checkTaskPayload = (req, res, next) => {
    if (!req.body.task_description) {
        res.status(400).json({ message: 'Task Description is missing.' })
    } else if (typeof(req.body.task_completed) !== "number" && req.body.project_completed) {
        res.status(400).json({ message: 'Please enter Task Completed with a 0 for false or a 1 for true.' })
    }
    next();
}

const checkProjectId = (req, res, next) => {
    PROJECTS.getById(req.body.project_id)
        .then(project => {
            if(project.length) {
                next();
            } else {
                throw Error(`No Project found with id ${req.params.id}`)
            }
        })
        .catch(err => {
            err.status = 404;
            next(err);
        })
}

module.exports = {
    checkTaskId,
    checkTaskPayload,
    checkProjectId
}