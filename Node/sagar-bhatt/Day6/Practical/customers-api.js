const chalk = require("chalk");
require("dotenv").config({ path: "../.env" });
const express = require("express");
const Joi = require("joi");
const { writeFile } = require("fs").promises;
port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
let customers = require("./json/customer.json");
const customerPath = "./json/customer.json";

// * VALIDATION: Joi
const validateCustomer = (customer) => {
  const joiSchema = Joi.object({
    company: Joi.string().trim().min(3).required(),
    firstName: Joi.string().trim().min(3).required(),
    lastName: Joi.string().trim().min(3).required(),
  });
  return joiSchema.validate(customer);
};

// * Update File
async function updateCustomersJson(file, customers) {
  await writeFile(file, JSON.stringify(customers));
}

// * ROUTES
app.get("/", (req, res) => {
  res.send(
    `<h3>Customers REST API!!</h3><a href="http://localhost:3000/customers">http://localhost:3000/customers</a>`
  );
});

// * 1.Create a Restful API, which will return Customer list in JSON format.
// ? http://localhost:3000/customers
app.get("/customers", (req, res) => {
  res.send(customers);
});

// * 2. Create a Restful API which will search a particular record from the customer list.
// ? http://localhost:3000/customers/1
app.get("/customers/:id", (req, res) => {
  const customer = customers.find(
    (elem) => elem.id === parseInt(req.params.id)
  );
  if (!customer) {
    console.log(chalk.red(`Not Found!!`));
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>'
      );
  }
  res.send(customer);
});

// * 3. Create a Restful API which will insert a new customer object in the customer list.
// ? http://localhost:3000/customer
app.post("/customers", (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    console.log(chalk.red(error.details[0].message));
    return res.send(error.details[0].message);
  } else {
    const customer = {
      id: customers.length + 1,
      company: req.body.company,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    customers.push(customer);
    updateCustomersJson(customerPath, customers);
    res.send(customer);
  }
});

// * 4. Create a Restful API which update a name of existing customer whose customer ID is 1
// ? http://locahost:3000/customer
app.put("/customers/:id", (req, res) => {
  let customer = customers.find((elem) => elem.id === parseInt(req.params.id));
  if (!customer) {
    console.log(chalk.red(`Not Found!!`));
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>'
      );
  } else {
    const { error } = validateCustomer(req.body);
    if (error) {
      console.log(chalk.red(error.details[0].message));
      return res.send(error.details[0].message);
    } else {
      customer.company = req.body.company;
      customer.firstName = req.body.firstName;
      customer.lastName = req.body.lastName;
      updateCustomersJson(customerPath, customers);
      res.send(customer);
    }
  }
});

// * 5. Create a Restful API which will delete a record from the customer list.
// ? http://localhost:3000/customer
app.delete("/customers/:id", (req, res) => {
  const customer = customers.find(
    (elem) => elem.id === parseInt(req.params.id)
  );
  if (!customer) {
    console.log(chalk.red(`Not Found!!`));
    res
      .status(404)
      .send(
        '<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>'
      );
  } else {
    const index = customers.indexOf(customer);
    customers.splice(index, 1);
    updateCustomersJson(customerPath, customers);
    res.send(customer);
  }
});

app.listen(port, () => {
  console.log(chalk.green(`Server started on port: ${port}`));
});
