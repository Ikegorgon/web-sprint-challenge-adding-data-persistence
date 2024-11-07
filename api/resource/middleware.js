const RESOURCES = require('./model.js');

const checkResourceId = (req, res, next) => {
    RESOURCES.getById(req.params.id)
        .then(resource => {
            if(resource.length) {
                next();
            } else {
                throw Error(`No Resource found with id ${req.params.id}`)
            }
        })
        .catch(err => {
            err.status = 404;
            next(err);
        })
}

const checkResourcePayload = (req, res, next) => {
    RESOURCES.getAll()
    .then(resource => {
        if (!req.body.resource_name || resource.includes(req.body.resource_name)) {
            res.status(400).json({ message: 'Resource Name is either missing or already taken.' })
        }
        next();
    })
    .catch(err => {
        next(err);
    })
}

module.exports = {
    checkResourceId,
    checkResourcePayload
}