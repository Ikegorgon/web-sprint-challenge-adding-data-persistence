// build your `/api/projects` router here
const router = require('express').Router();
const MIDDLEWARE = require('./middleware.js');
const PROJECTS = require('./model.js');

router.get('/', (req, res, next) => {
    PROJECTS.getAll()
        .then(project => {
            let projectList = [];
            project.forEach(p => {
                projectList.push({...p, project_completed: p.project_completed ? true : false})
            })
            res.status(200).json(projectList);
        })
        .catch(err => {
            next(err);
        })
})

router.get('/:id', MIDDLEWARE.checkProjectId, (req, res, next) => {
    PROJECTS.getById(req.params.id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            next(err);
        })
})

router.post('/', MIDDLEWARE.checkProjectPayload, (req, res, next) => {
    PROJECTS.create(req.body)
        .then(project => {
            PROJECTS.getById(project[0])
                .then(p => {
                    res.status(201).json({...p[0], project_completed: p[0].project_completed ? true : false});
                })
        })
        .catch(err => {
            next(err);
        })
})

router.put('/:id', MIDDLEWARE.checkProjectId, MIDDLEWARE.checkProjectPayload, (req, res, next) => {
    PROJECTS.update(req.params.id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            next(err);
        })
})

router.delete('/:id', MIDDLEWARE.checkProjectId, (req, res, next) => {
    PROJECTS.deleteById(req.params.id)
        .then(project => {
            res.status(200).json(project);
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