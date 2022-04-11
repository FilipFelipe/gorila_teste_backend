
exports.up = function(knex) {
    return knex.schema.createTable('cdi_TB', table => {
        table.increments('id').primary()
        table.string('name').notNullable();
        table.date('date').notNullable();
        table.float('lastTradePrice').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};


exports.down = function(knex) {
    return knex.schema.dropTable('cdi_TB');
};
