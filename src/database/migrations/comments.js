/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('comments', function(table) {
    table.increments()
    table.dateTime('comment_at').notNullable()
    table.dateTime('updated_at').notNullable()
    table.string('description').notNullable() 

    table.integer('user_id').notNullable()
    table.foreign('user_id').references('id').inTable('users')

    table.integer('post_id').notNullable()
    table.foreign('post_id').references('id').inTable('posts')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('comments')
};
