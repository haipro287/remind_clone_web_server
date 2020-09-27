const Model = require("objection").Model;
const knex = require("../databases/knex");

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "user";
  }
}

module.exports = User;
