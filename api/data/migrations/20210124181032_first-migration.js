exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
    .createTable('potlucks', (potlucks) => {
      potlucks.increments('potluck_id')
      potlucks.string('potluck_name', 200).notNullable()
      potlucks.string('location_name', 200).notNullable()
      potlucks.string('location_address', 200).notNullable()
      potlucks.string('location_city', 200).notNullable()
      potlucks.string('location_state', 200).notNullable()
      potlucks.string('location_zip', 200).notNullable()
      potlucks.string('date', 200).notNullable()
      potlucks.string('duration', 200).notNullable()
      potlucks.integer('organizer', 200)
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      potlucks.timestamps(false, true)
    })
    .createTable('food', (food) => {
      food.increments('food_id')
      food.string('food_name', 200).notNullable()
      food.timestamps(false, true)
    })
    .createTable('potluck_users', (potluck_users) => {
      potluck_users.increments('potluck_user_id')
      potluck_users.integer('user_id', 200)
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      potluck_users.integer('potluck_id', 200)
        .notNullable()
        .unsigned()
        .references('potluck_id')
        .inTable('potlucks')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      potluck_users.string('password', 200).notNullable()
      potluck_users.timestamps(false, true)
    })
    .createTable('potluck_foods', (potluck_foods) => {
      potluck_foods.increments('potluck_food_id')
      potluck_foods.integer('potluck_user_id', 200)
        .notNullable()
        .unsigned()
        .references('potluck_user_id')
        .inTable('potluck_users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      potluck_foods.integer('food_id', 200)
        .notNullable()
        .unsigned()
        .references('food_id')
        .inTable('food')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      potluck_foods.timestamps(false, true)
    })
}

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('potluck_foods')
    .dropTableIfExists('potluck_users')
    .dropTableIfExists('foods')
    .dropTableIfExists('potlucks')
    .dropTableIfExists('users')
}
