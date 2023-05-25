import express from "express";
import { db } from "../database-setup/db";

const studentsRouter = express.Router();

studentsRouter
  .get("/", async (req, res) => {
    try {
      const allStudents = await db.selectFrom("students").selectAll().execute();

      res.status(200).json(allStudents);
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Auro server Error");
    }
  })
  .post("/", async (req, res) => {
    try {
      console.log(req.body);
      const result = await db
        .insertInto("students")
        .values(req.body)
        .executeTakeFirst();
      res.status(200).json({ message: "student added successfully" });
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Auro server Error");
    }
  })
  .get("/:id", async (req, res) => {
    try {
      console.log("get by id");
      const result = await db
        .selectFrom("students")
        .selectAll()
        .where("id", "=", parseInt(req.params.id))
        .executeTakeFirst();
      res.status(200).json(result);
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Auro server Error");
    }
  })
  .put("/:id", async (req, res) => {
    try {
      console.log("in put by id");

      const { id } = req.params;
      const checkStudentExist = await db
        .selectFrom("students")
        .selectAll()
        .where("id", "=", parseInt(id))
        .executeTakeFirst();
      if (checkStudentExist) {
        await db
          .updateTable("students")
          .set(req.body)
          .where("id", "=", parseInt(id))
          .executeTakeFirst();
        res.status(200).json({ message: "student updated" });
      } else {
        res.status(400).send("student unavailable");
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Auro server Error");
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      console.log("in delete by id");

      const { id } = req.params;
      const checkStudentExist = await db
        .selectFrom("students")
        .selectAll()
        .where("id", "=", parseInt(id))
        .executeTakeFirst();
      if (checkStudentExist) {
        await db
          .deleteFrom("students")
          .where("id", "=", parseInt(id))
          .executeTakeFirst();
        res.status(200).json({ message: "student deleted" });
      } else {
        res.status(400).send("student unavailable");
      }
    } catch (e) {
      console.error(e);
      res.status(500).send("Internal Auro server Error");
    }
  });

export default studentsRouter;
