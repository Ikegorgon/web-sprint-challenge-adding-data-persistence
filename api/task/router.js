// build your `/api/tasks` router here
const router = require('express').Router();
const MIDDLEWARE = require('./middleware.js');
const TASKS = require('./model.js');

router.get('/', (req, res, next) => {
    TASKS.getAll()
        .then(task => {
            console.log(task)
            let taskList = [];
            task.forEach(t => {
                taskList.push({...t, task_completed: t.task_completed ? true : false})
            })
            res.status(200).json(taskList);
        })
        .catch(err => {
            next(err);
        })
})

router.get('/:id', MIDDLEWARE.checkTaskId, (req, res, next) => {
    TASKS.getById(req.params.id)
        .then(task => {
            res.status(200).json(task);
        })
        .catch(err => {
            next(err);
        })
})

router.post('/', MIDDLEWARE.checkTaskPayload, MIDDLEWARE.checkProjectId, (req, res, next) => {
    TASKS.create(req.body)
        .then(task => {
            console.log(task[0])
            TASKS.getById(task[0])
                .then(t => {
                    console.log(t)
                    res.status(201).json({...t[0], task_completed: t[0].task_completed ? true : false});
                })
        })
        .catch(err => {
            next(err);
        })
})

router.put('/:id', MIDDLEWARE.checkTaskId, MIDDLEWARE.checkTaskPayload, MIDDLEWARE.checkProjectId, (req, res, next) => {
    TASKS.update(req.params.id)
        .then(task => {
            res.status(200).json(task);
        })
        .catch(err => {
            next(err);
        })
})

router.delete('/:id', MIDDLEWARE.checkTaskId, (req, res, next) => {
    TASKS.deleteById(req.params.id)
        .then(task => {
            res.status(200).json(task);
        })
        .catch(err => {
            next(err);
        })
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message, error: err });
    next();
})

module.exports = router;