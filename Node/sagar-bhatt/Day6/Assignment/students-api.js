require("dotenv").config({ path: "../.env" });
const chalk = require("chalk");
const express = require("express");
const Joi = require("joi");
const { writeFile } = require("fs").promises;

const studentsList = require("./json/students.json");
const students = studentsList.Students;
const studentsPath = "./json/students.json";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

function validateSubject(subject) {
  const joiSchema = Joi.object({
    Eng: Joi.number().min(0).max(100).required(),
  });
  return joiSchema.validate(subject);
}
async function updateStudent(path, students) {
  await writeFile(path, JSON.stringify(students));
}

// * ROUTES
app.get("/", (req, res) => {
  res.send(
    `<h3>Students REST API!!</h3><a href="http://localhost:3000/students">http://localhost:3000/students</a>`
  );
});

// * 1. Create a RESTFUL API which will return a Studentlist.
// ? http://localhost:3000/students
app.get("/students", (req, res) => {
  console.log(chalk.blue(JSON.stringify(studentsList)));
  res.send(studentsList);
});

// * 2. Create RESTFUL API which will return a Particular Student Record
// ? http://localhost:3000/students/1
app.get("/students/:id", (req, res) => {
  const student = students.find((elem) => elem.ID === parseInt(req.params.id));
  if (!student) {
    console.log(chalk.red(`Record Not Found!!`));
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color: darkred;">Record Not Found!! </h2>'
      );
  } else {
    console.log(chalk.blue(JSON.stringify(student)));
    res.send(student);
  }
});

// * 3. Create a RESTFUL API which return a particular student Fees Record. Fees field are http://localhost:3000/students/1/fees
app.get("/students/:id/fees", (req, res) => {
  const student = students.find((elem) => elem.ID === parseInt(req.params.id));
  console.log(student);
  if (!student) {
    console.log(chalk.red(`Record Not Found!!`));
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color: darkred;">Record Not Found!! </h2>'
      );
  } else {
    console.log(chalk.blue(JSON.stringify(student.Fees)));
    res.send(student.Fees);
  }
});

// * 4. Create a RESTFUL API which will return a particular student Exam Result. Result Fields are http://localhost:/3000/students/1/result
app.get("/students/:id/result", (req, res) => {
  const student = students.find((elem) => elem.ID === parseInt(req.params.id));
  if (!student) {
    console.log(chalk.red(`Record Not Found!!`));
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color: darkred;">Record Not Found!! </h2>'
      );
  } else {
    console.log(chalk.blue(JSON.stringify(student.Result)));
    res.send(student.Result);
  }
});

// * 5. Create a RESTFUL API which will update a result of result of student id 1. Update the marks for English Subject.
app.put("/students/:id/result/eng", (req, res) => {
  const student = students.find((elem) => elem.ID === parseInt(req.params.id));
  if (!student) {
    console.log(chalk.red(`Record Not Found!!`));
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color: darkred;">Record Not Found!! </h2>'
      );
  } else {
    const { error } = validateSubject(req.body);
    console.log(req.body);
    if (error) {
      console.log(chalk.red(error.details[0].message));
      return res.send(error.details[0].message);
    } else {
      student.Result.Total -= student.Result.Eng;
      student.Result.Eng = req.body.Eng;
      student.Result.Total += student.Result.Eng;
      updateStudent(studentsPath, studentsList);
      console.log(chalk.blue(JSON.stringify(student)));
      res.send(student);
    }
  }
});

app.listen(port, () => {
  console.log(chalk.green(`Server started on port: ${port}`));
});
