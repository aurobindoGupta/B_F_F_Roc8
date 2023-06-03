import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { create } from "express-handlebars";
import { ifEquality } from "./views/helpers/ifEquality";
import studentsRouter from "./routers/studentsRouter";
import bodyParser from "body-parser";
import adminRouter from "./routers/adminRouter";
import cookieParser from "cookie-parser";
import { verify } from "./utils/jwtService";
import { passiveAuth } from "./middlewares/passiveAuth";
import { gatedAccess } from "./middlewares/gatedAccess";

//creating handlebars engine.
const hbs = create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),

  helpers: {
    ifEquality,
  },
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
/**
 * authentication custum middle ware!!
 */

//telling express to use.
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

app.get("/", passiveAuth, (req, res) => {
  //@ts-expect-error
  const isAdmin = !!req.jwt;
  res.status(200).render("home", {
    layout: "hero",
    title: "Home",
    // TODO: has to be implemented after learning Auth
    isAdmin,
  });
});

app.get("/students", gatedAccess, (req, res) => {
  res.status(200).render("students", {
    layout: "navigation",
    title: "Student Details",
    // TODO: Data has to be implemented after learning Postgres
    // data: await getAllStudents(),
  });
});

app.get("/add-student", (req, res) => {
  res.status(200).render("addStudents", {
    layout: "navigation",
    title: "Add Student",
    action: "/api/students",
    method: "POST",
  });
});

app.get("/edit-student/:id", (req, res) => {
  res.status(200).render("addStudents.hbs", {
    layout: "navigation",
    title: "Edit Student",
    // TODO: Required Student logic has to be implemented after learning Postgres
    // student: requiredStudent,
    // action: "/api/students/" + requiredStudent.id,
    method: "PUT",
  });
});

app.get("/admin-login", (req, res) => {
  res.status(200).render("adminLogin.hbs", {
    layout: "login",
    title: "Admin",
    submitTarget: "/api/admin/login",
    submitMethod: "POST",
    formTitle: "Admin Login",
  });
});
app.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

app.use("/api/students", studentsRouter);

app.use("/api/admin", adminRouter);

app.listen(3001, () => {
  console.log("Express ServerStarted");
});
