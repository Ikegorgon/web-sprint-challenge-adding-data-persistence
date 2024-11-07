const PROJECTS = require('./model.js');

const checkProjectId = (req, res, next) => {
    PROJECTS.getById(req.params.id)
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

const checkProjectPayload = (req, res, next) => {
    if (!req.body.project_name) {
        res.status(400).json({ message: 'Project Name is missing.' })
    } else if (typeof(req.body.project_completed) !== "number" && req.body.project_completed) {
        res.status(400).json({ message: 'Please enter Project Completed with a 0 for false or a 1 for true.' })
    }
    next();
}

module.exports = {
    checkProjectId,
    checkProjectPayload
}