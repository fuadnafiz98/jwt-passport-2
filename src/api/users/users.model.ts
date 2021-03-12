import { Model } from "objection";

class Users extends Model {
  static get tableName() {
    return "users";
  }
}

export default Users;
