exports.up = function (knex) {
  return knex.schema
    .createTable("role", function (t) {
      t.increments("id").primary();
      t.string("name", 50).notNullable();
    })
    .createTable("user", function (t) {
      t.charset("utf8mb4");
      t.increments("id").primary();
      t.string("name", 200).notNullable();
      t.string("email", 200).notNullable().unique();
      t.string("password", 100).notNullable();
      t.integer("role_id").unsigned().notNullable();
      t.foreign("role_id").references("role.id");
      t.timestamps(true, true);
    })
    .createTable("classroom", function (t) {
      t.charset("utf8mb4");
      t.increments("id").primary();
      t.string("code", 6)
        .unique()
        .notNullable()
        .comment("Unique class code that students use to join classes");
      t.string("name", 100).notNullable();
      t.string("school", 100);
      t.timestamps(true, true);
    })
    .createTable("message", function (t) {
      t.charset("utf8mb4");
      t.increments("id").primary();
      t.integer("sender_id").unsigned().notNullable();
      t.integer("receiver_id").unsigned().notNullable();
      t.integer("classroom_id").unsigned().notNullable();
      t.string("message", 1000).comment("Formatted version of message content");
      t.string("message_text", 1000).comment(
        "Plain text version of message content, used for full-text searching"
      );
      t.integer("parent_message_id").unsigned();
      t.foreign("sender_id").references("user.id");
      t.foreign("receiver_id").references("user.id");
      t.foreign("classroom_id").references("classroom.id");
      t.foreign("parent_message_id").references("message.id");
      t.timestamps(true, true);
    })
    .raw("ALTER TABLE message ADD FULLTEXT(message_text)")
    .createTable("m_student_classroom", function (t) {
      t.integer("student_id").unsigned();
      t.integer("classroom_id").unsigned();
      t.date("joined_date");
      t.foreign("student_id").references("user.id");
      t.foreign("classroom_id").references("classroom.id");
      t.unique(["student_id", "classroom_id"]);
    })
    .createTable("class_owner", function (t) {
      t.integer("teacher_id").unsigned();
      t.integer("classroom_id").unsigned();
      t.foreign("teacher_id").references("user.id");
      t.foreign("classroom_id").references("classroom.id");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("m_student_classroom")
    .dropTableIfExists("class_owner")
    .dropTableIfExists("message")
    .dropTableIfExists("user")
    .dropTableIfExists("role")
    .dropTableIfExists("classroom");
};
