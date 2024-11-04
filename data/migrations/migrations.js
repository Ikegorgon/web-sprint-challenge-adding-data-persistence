exports.up = function (knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments('projects_id');
            tbl.text('project_name', 128)
                .notNullable();
            tbl.text('project_description');
            tbl.integer('project_completed')
                .defaultTo(0);
        })
        .createTable('resources', tbl => {
            tbl.increments('resource_id');
            tbl.text('resource_name', 128)
                .unique()
                .notNullable();
            tbl.text('resource_description');
        })
        .createTable('tasks', tbl => {
            tbl.increments('task_id');
            tbl.text('task_description', 128)
                .notNullable();
            tbl.text('task_notes');
            tbl.integer('task_completed')
                .defaultTo(0);
            tbl.integer('project_id')
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('project_resources', tbl => {
            tbl.increments();
            tbl.integer('project_id')
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            tbl.integer('resource_id')
                .notNullable()
                .references('resource_id')
                .inTable('resources')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })

}

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('project_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects');
}