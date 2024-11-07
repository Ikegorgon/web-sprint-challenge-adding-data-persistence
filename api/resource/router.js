// build your `/api/resources` router here
const router = require('express').Router();
const MIDDLEWARE = require('./middleware.js');
const RESOURCES = require('./model.js');

router.get('/', (req, res, next) => {
    RESOURCES.getAll()
        .then(resource => {
            res.status(200).json(resource);
        })
        .catch(err => {
            next(err);
        })
})

router.get('/:id', MIDDLEWARE.checkResourceId, (req, res, next) => {
    RESOURCES.getById(req.params.id)
        .then(resource => {
            res.status(200).json(resource);
        })
        .catch(err => {
            next(err);
        })
})

router.post('/', MIDDLEWARE.checkResourcePayload, (req, res, next) => {
    RESOURCES.create(req.body)
        .then(resource => {
            RESOURCES.getById(resource[0])
                .then(r => {
                    res.status(201).json(r[0]);
                })
        })
        .catch(err => {
            next(err);
        })
})

router.put('/:id', MIDDLEWARE.checkResourceId, MIDDLEWARE.checkResourcePayload, (req, res, next) => {
    RESOURCES.update(req.params.id)
        .then(resource => {
            res.status(200).json(resource);
        })
        .catch(err => {
            next(err);
        })
})

router.delete('/:id', MIDDLEWARE.checkResourceId, (req, res, next) => {
    RESOURCES.deleteById(req.params.id)
        .then(resource => {
            res.status(200).json(resource);
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