// build your `Project` model here
const db = require('../../data/dbConfig.js');

const getAll = () => {
    return db('projects');
}

const getById = (id) => {
    return db('projects').where('project_id', id);
}

const create = (project) => {
    return db('projects').insert(project);
}

const update = (id, project) => {
    return db('projects').where('project_id', id).update(project);
}

const deleteById = (id) => {
    return db('projects').where('project_id', id).delete();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
}