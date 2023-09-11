const sql = require("mysql2");
const { host, database, password, user } = process.env;

module.exports = sql.createPool({ host, user, database, password }).promise();
