const ENV = process.env.NODE_ENV || "development";
const { DB_URL } = process.env;

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  },
  production: {
    connection: `${DB_URL}?ssl=true`
  }
};

const customConfig = {
  development: {
    connection: {
      database: "nc_news",
      username: "dikasteria",
      password: "password"
    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      username: "dikasteria",
      password: "password"
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
