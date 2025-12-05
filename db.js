const pkg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});


(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        completed BOOLEAN DEFAULT FALSE
      );
    `);
    console.log("Tasks table ready!");
  } catch (err) {
    console.error("Error creating table:", err);
  }
})();

module.exports = pool;



