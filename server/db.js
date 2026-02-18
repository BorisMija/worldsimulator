const path = require('path');
const fs = require('fs');
const DB_TYPE = process.env.DB_TYPE || 'sqlite';

if (DB_TYPE === 'mssql') {
  // MSSQL (async)
  const sql = require('mssql');

  const config = process.env.MSSQL_CONNECTION_STRING
    ? { connectionString: process.env.MSSQL_CONNECTION_STRING }
    : {
        user: process.env.DB_USER || process.env.MSSQL_USER,
        password: process.env.DB_PASSWORD || process.env.MSSQL_PASSWORD,
        server: process.env.DB_HOST || process.env.MSSQL_HOST || 'localhost',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : (process.env.MSSQL_PORT ? parseInt(process.env.MSSQL_PORT, 10) : 1433),
        database: process.env.DB_DATABASE || process.env.MSSQL_DATABASE,
        options: { trustServerCertificate: true },
        pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
      };

  const poolPromise = new sql.ConnectionPool(config).connect().then((pool) => {
    // ensure table exists
    return pool.request().query(`IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' and xtype='U') CREATE TABLE users (id INT IDENTITY(1,1) PRIMARY KEY, username NVARCHAR(255) UNIQUE NOT NULL, password NVARCHAR(255) NOT NULL)`)
      .then(() => pool);
  });

  async function getUserByUsername(username) {
    const pool = await poolPromise;
    const res = await pool.request().input('username', sql.NVarChar, username).query('SELECT id, username, password FROM users WHERE username = @username');
    return res.recordset[0];
  }

  async function createUser(username, password) {
    const pool = await poolPromise;
    const res = await pool.request()
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, password)
      .query("INSERT INTO users (username, password) OUTPUT INSERTED.id VALUES (@username, @password)");
    return res.recordset[0].id;
  }

  module.exports = { getUserByUsername, createUser };

} else {
  // Default: SQLite (sync wrapped in promises)
  const Database = require('better-sqlite3');
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const dbPath = path.join(dataDir, 'db.sqlite');
  const db = new Database(dbPath);

  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `).run();

  function createUser(username, password) {
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    const info = stmt.run(username, password);
    return Promise.resolve(info.lastInsertRowid);
  }

  function getUserByUsername(username) {
    const row = db.prepare('SELECT id, username, password FROM users WHERE username = ?').get(username);
    return Promise.resolve(row);
  }

  module.exports = { createUser, getUserByUsername };
}
