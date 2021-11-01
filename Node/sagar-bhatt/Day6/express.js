const express = require("express");
const app = express();
app.use(express.json());
const Joi = require("joi");

require("dotenv").config({ path: "../.env" });
const port = process.env.PORT || 3001;

function validateBook(book) {
  const joiSchema = Joi.object({
    // id: Joi.number().required(),
    title: Joi.string().min(3).max(20).required(),
  });
  return joiSchema.validate(book);
}
// const books = [
//   { id: 1, title: "Node.JS" },
//   { id: 2, title: "MVC" },
//   { id: 3, title: ".NET Core" },
// ];
const books = require("./books.json");

// * routes
// * GET
app.get("/", (req, res) => {
  res.send("Created server using express.");
});
app.get("/api/books", (req, res) => {
  res.send(books);
});
app.get("/api/books/:id", (req, res) => {
  const book = books.find((elem) => {
    return elem.id == parseInt(req.params.id);
  });
  if (!book) {
    res
      .status(404)
      .send(
        `<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>`
      );
  }
  res.send(book);
});

// * POST
app.post("/api/books", (req, res) => {
  const { error } = validateBook(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const book = {
    id: books.length + 1,
    title: req.body.title,
  };
  books.push(book);
  res.send(book);
});

// * PUT
app.put("/api/books/:id", (req, res) => {
  const book = books.find((elem) => elem.id === parseInt(req.params.id));
  if (!book)
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>'
      );

  const { error } = validateBook(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  book.title = req.body.title;
  res.send(book);
});

// * DELETE
app.delete("/api/books/:id", (req, res) => {
  const book = books.find((elem) => elem.id === parseInt(req.params.id));
  if (!book) {
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>'
      );
  }
  const index = books.indexOf(book);
  books.splice(index, 1);
  res.send(book);
});

app.listen(port, () => {
  console.log("Created server using express.");
});

// ---------------------------------------------------

// * Express
// ? Express is a small framework that sits on top of Node.js’s web server functionality to simplify its APIs and add helpful new features.It makes it easier to organize your application’s functionality with middle ware and routing; it adds helpful utilities to Node.js’s HTTP objects;it facilitates the rendering of dynamic HTTP objects.

// * Joi
// TODO: https://www.geeksforgeeks.org/how-to-validate-data-using-hapi-joi-module-in-node-js/
// ? Joi module is a popular module for data validation. This module validates the data based on schemas. There are various functions like optional(), required(), min(), max(), etc which make it easy to use and a user-friendly module for validating the data.
