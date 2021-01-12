exports.up = function(knex) {
    return knex.schema.createTable("notes", table => {
        table.increments("id").notNullable().primary();
        table.string("guid").notNullable().unique();
        table.string("note").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("notes");
};
