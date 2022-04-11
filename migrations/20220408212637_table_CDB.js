
exports.up = function(knex) {
    return knex.schema.createTable('cdb_TB', table => {
        table.increments('id').primary()
        table.float('cdbRate').notNullable();
        table.date('investmentDate').notNullable();
        table.date('currentDate').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cdb_TB');
};
