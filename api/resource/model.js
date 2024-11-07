// build your `Resource` model here
const db = require('../../data/dbConfig.js');

const getAll = () => {
    return db('resources');
}

const getById = (id) => {
    return db('resources').where('resource_id', id);
}

const create = (resource) => {
    return db('resources').insert(resource);
}

const update = (id, resource) => {
    return db('resources').where('resource_id', id).update(resource);
}

const deleteById = (id) => {
    return db('resources').where('resource_id', id).delete();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
}