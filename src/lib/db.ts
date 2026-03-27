import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "92.113.22.21",
  user: "u243158893_shunkin", // Измени на свой
  password: "Shunkin123", // Измени на свой
  database: "u243158893_shunkin", // Измени на свой
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
