
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments('id');
        tbl.text('username', 128).notNullable().unique()
        tbl.text('password', 128).notNullable()
    })
    .createTable('saved_strains', tbl => {
        tbl.increments()
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.text('strain_name')
            .notNullable()
        tbl.text('type')
            .notNullable()
        tbl.integer('rating')
            .unsigned()
            .notNullable()
        tbl.text('effects')
            .notNullable()
        tbl.text('flavors')
            .notNullable()
        tbl.text('description')
            .notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('saved_strains')
        .dropTableIfExists('users')
        
};
