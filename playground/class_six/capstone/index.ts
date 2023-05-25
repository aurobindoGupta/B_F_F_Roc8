import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { create } from "express-handlebars";
import { ifEquality } from "./views/helpers/ifEquality";
import studentsRouter from "./routers/studentsRouter";
import bodyParser from "body-parser";



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

//telling express to use.
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.status(200).render("home", {
    layout: "hero",
    title: "Home",
  });
});

app.get("/students", (req, res) => {
  res.status(200).render("students", {
    layout: "navigation",
    title: "Student Details",
    // TODO: Data has to be implemented after learning Postgres
    // data: await getAllStudents(),
  });
});

app.get("/add-students");

app.get("/edit-students/:id");

app.get("/admin-login");

app.use("/api/students", studentsRouter);

// app.use("/api/admin");

app.listen(3001, () => {
  console.log("Express ServerStarted");
});
