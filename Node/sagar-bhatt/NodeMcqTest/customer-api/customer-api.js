const chalk = require("chalk");
const express = require("express");
const Joi = require("joi");
port = 3000;
const app = express();
app.use(express.json());
const router = express.Router();

const customersList = {
  userList: [
    {
      id: 1,
      company: "Radix Web",
      firstName: "Sagar",
      lastName: "Bhatt",
    },
    {
      id: 2,
      company: "Avionics Inc.",
      firstName: "Harsh",
      lastName: "Bhatt",
    },
    {
      id: 3,
      company: "Avis World Headquarters",
      firstName: "Khushubu",
      lastName: "Bhatt",
    },
  ],
};
const customers = customersList.userList;

// * VALIDATION: Joi
const validateCustomer = (customer) => {
  const joiSchema = Joi.object({
    company: Joi.string().trim().min(3).required(),
    firstName: Joi.string().trim().min(3).required(),
    lastName: Joi.string().trim().min(3).required(),
  });
  return joiSchema.validate(customer);
};

// * LOGGER MIDDLEWARE
const logger = (req, res, next) => {
  console.log(
    chalk.magenta(`Logged ${req.url} ${req.method} -- ${new Date()}`)
  );
  next();
};
app.use(logger);

// * ROUTES
app.get("/", (req, res) => {
  res.send(
    `<h3>Customers REST API!!</h3><a href="http://localhost:3000/customers">http://localhost:3000/customers</a>`
  );
});

app.use("/customers", router);

// * 1.Create a Restful API, which will return Customer list in JSON format.
// ? http://localhost:3000/customers
router.get("/", (req, res) => {
  res.send(customersList);
});

// * 2. Create a Restful API which will search a particular record from the customer list.
// ? http://localhost:3000/customers/1
router.get("/:id", (req, res) => {
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
router.post("/", (req, res) => {
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
    res.send(customer);
  }
});

// * 4. Create a Restful API which update a name of existing customer whose customer ID is 1
// ? http://locahost:3000/customer
router.put("/:id", (req, res) => {
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
      res.send(customer);
    }
  }
});

// * 5. Create a Restful API which will delete a record from the customer list.
// ? http://localhost:3000/customer
router.delete("/:id", (req, res) => {
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
    res.send(customer);
  }
});

// * Error Handling Middleware
app.use((req, res, next) => {
  next(err);
});

app.use((err, req, res, next) => {
  console.error(
    chalk.red(
      JSON.stringify({
        status: 404,
        message: "Page Not Found",
      })
    )
  );
  res.status(404).send({
    status: 404,
    message: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server started on port: ${port}`));
});
