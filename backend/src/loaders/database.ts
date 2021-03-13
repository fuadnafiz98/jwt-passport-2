import knex from "knex";
import { Model } from "objection";
import knexConfig from "../../knexfile";

function loadDatabse() {
  const connectionConfig = knexConfig["development"];

  const connection = knex(connectionConfig);

  Model.knex(connection);
}
export default loadDatabse;
