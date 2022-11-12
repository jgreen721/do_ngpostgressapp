const Pool = require("pg").Pool;

let prodConf = {
  connectionString:
    "postgres://citus:b00Ba123@c.mypostgrescluster.postgres.database.azure.com:5432/citus?sslmode=require",
  rejectUnauthorized: true,
};

const pool = new Pool(prodConf);

let devConf = {
  database: "saywhatdb",
  user: "",
  password: "",
  port: 5432,
};

module.exports = pool;
