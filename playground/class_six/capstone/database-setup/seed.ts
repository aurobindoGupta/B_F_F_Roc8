import { createPool, sql } from "slonik";
import * as dotenv from "dotenv";
dotenv.config();

// Function to seed admin data
async function adminSeed() {
  const pool = await createPool(process.env.DATABASE_URL as string);

  // Clear existing table and insert new data
  await pool.connect(async (connection) => {
    await connection.query(sql.unsafe`DELETE FROM admin`);
    await connection.query(sql.unsafe`
      INSERT INTO admin (email, password)
      VALUES ('test@gmail.com', '123456')
    `);
  });

  console.log("Admin data seeded.");
}

// New teacher data
const newTeacher = {
  firstName: "Dani",
  lastName: "Akash",
  age: 24,
  gender: "Male",
  email: "test@gmail.com",
};

// Function to seed teacher data
async function teacherSeeder() {
  try {
    const pool = await createPool(process.env.DATABASE_URL as string);

    let teacherId;

    // Clear existing table and insert new data
    await pool.connect(async (connection) => {
      await connection.query(sql.unsafe`DELETE FROM teachers`);
      const result = await connection.query(sql.unsafe`
        INSERT INTO teachers (first_name, last_name, age, gender, email)
        VALUES (${newTeacher.firstName}, ${newTeacher.lastName}, ${newTeacher.age}, ${newTeacher.gender}, ${newTeacher.email})
        RETURNING id
      `);

      teacherId = result.rows[0].id;
    });

    console.log("Teacher data seeded.");

    // Seed student data
    await studentSeeder(teacherId as unknown as number);
  } catch (error) {
    console.log("Error seeding teacher data:", error);
  }
}

// Student data
const studentData = [
  {
    firstName: "Arun",
    lastName: "Kumar",
    age: 16,
    gender: "Male",
  },
  {
    firstName: "Ram",
    lastName: "Kumar",
    age: 16,
    gender: "Male",
  },
  {
    firstName: "Ravi",
    lastName: "Kumar",
    age: 16,
    gender: "Male",
  },
  {
    firstName: "Magesh",
    lastName: "Kumar",
    age: 16,
    gender: "Male",
  },
  {
    firstName: "Suresh",
    lastName: "Kumar",
    age: 16,
    gender: "Male",
  },
];

// Function to seed student data
async function studentSeeder(teacherId: number) {
  const pool = await createPool(process.env.DATABASE_URL as string);
  // Clear existing table and insert new data
  await pool.connect(async (connection) => {
    await connection.query(sql.unsafe`DELETE FROM students`);

    for (const student of studentData) {
      await connection.query(sql.unsafe`
        INSERT INTO students (first_name, last_name, age, gender, teacher_id)
        VALUES (${student.firstName}, ${student.lastName}, ${student.age}, ${student.gender}, ${teacherId})
      `);
    }
  });

  console.log("Student data seeded.");
}

// Call the seeding functions
adminSeed();
teacherSeeder();
