import path from "path";

module.exports = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "source", "database", "database.sqlite"),
  },
  migrations: {
    directory: path.resolve(__dirname, "source", "database", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "source", "database", "seeds"),
  },
  useNullAsDefault: true,
};
