import { createPool, sql } from "slonik";
import * as dotenv from "dotenv";
dotenv.config();

async function setupDatabase() {
  try {
    const pool = await createPool(process.env.DATABASE_URL as string);

    await pool.connect(async (connection) => {
      // Create admin table
      await connection.query(sql.unsafe`
        CREATE TABLE admin (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
        );
      `);

      // Create teachers table
      await connection.query(sql.unsafe`
        CREATE TABLE teachers (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255),
          age INTEGER NOT NULL CHECK (age >= 21),
          gender VARCHAR(255) NOT NULL CHECK (gender IN ('Male', 'Female')),
          email VARCHAR(255) UNIQUE
        );
      `);

      // Create students table
      await connection.query(sql.unsafe`
        CREATE TABLE students (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255),
          age INTEGER NOT NULL CHECK (age BETWEEN 3 AND 16),
          gender VARCHAR(255) NOT NULL CHECK (gender IN ('Male', 'Female')),
          teacher_id INTEGER NOT NULL REFERENCES teachers (id)
        );
      `);
    });

    console.log("Database setup complete.");
  } catch (error) {
    console.log("Error setting up the database:", error);
  }
}

setupDatabase();
