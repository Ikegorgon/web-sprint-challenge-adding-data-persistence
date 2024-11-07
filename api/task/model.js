// build your `Task` model here
const db = require('../../data/dbConfig.js');

const getAll = () => {
    return db('tasks')
        .leftJoin('projects', 'tasks.project_id', 'projects.project_id')
        .select('tasks.task_id', 'tasks.task_description', 'tasks.task_notes', 'tasks.task_completed', 'projects.project_name', 'projects.project_description');
}

const getById = (id) => {
    return db('tasks')
        .leftJoin('projects', 'tasks.project_id', 'projects.project_id')
        .select('tasks.task_id', 'tasks.task_description', 'tasks.task_notes', 'tasks.task_completed', 'projects.project_name', 'projects.project_description')
        .where('tasks.task_id', id);
}

const create = (task) => {
    return db('tasks').insert(task);
}

const update = (id, task) => {
    return db('tasks').where('task_id', id).update(task);
}

const deleteById = (id) => {
    return db('tasks').where('task_id', id).delete();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
}