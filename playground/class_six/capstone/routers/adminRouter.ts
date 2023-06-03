import express from "express";
import { db } from "../database-setup/db";
import { compareHash } from "../utils/hash";
import { sign } from "../utils/jwtService";

const adminRouter = express.Router();

adminRouter.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const admin = await db
    .selectFrom("admin")
    .where("admin.email", "=", email)
    .selectAll()
    .executeTakeFirst();

  if (admin) {
    const isPasswordValid = compareHash(password, admin.password);
    if (isPasswordValid) {
      const token = sign({
        id: admin.id,
        email: admin.email,
      });
      res.cookie("jwt", token, { httpOnly: true });
      res.redirect("/");
    } else {
      res.status(400).send("invalid user");
    }
  } else {
    res.status(400).send("invalid user");
  }
});

export default adminRouter;
