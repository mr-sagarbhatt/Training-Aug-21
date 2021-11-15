const chalk = require("chalk");
require("dotenv").config();
const port = process.env.PORT;

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// * Connecting to MongoDB server and database
const mongoDB = "mongodb://localhost:27017/test-user";
mongoose
  .connect(mongoDB)
  .then(() => console.log(chalk.magenta(`Connected.`)))
  .catch((err) => console.log(chalk.red(err)));

// * Schema(Defines Structure of document, default values, validation)
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
      lowercase: true, // * Always convert `name` to lowercase
      alias: "userName",
      unique: true, // * Unique index.
      trim: true,
      minlength: [3, "Minimum 3 characters required!"],
      maxlength: [10, "Maximum 10 characters required!"],
    },
    gender: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["male", "female", "others"],
    },
    phoneNumber: {
      type: Number,
      required: true,
      // * custom validator
      validate(value) {
        if (value.toString().length != 10) {
          throw new Error(`Please Enter proper phone number.`);
        }
      },
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      // * async custom validator
      // validate: {
      //   validator: async () => {},
      //   message: `Please Enter proper email.`,
      // },
    },
    admin: {
      type: Boolean,
      required: true,
      default: 0,
    },
    birthDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// * Model
// * Create Collection
const UserDetail = mongoose.model("UserDetail", userSchema);

// * Insert or create User
const createUser = async () => {
  try {
    const objUserSagar = new UserDetail({
      _id: 1,
      userName: "sagar",
      gender: "male",
      admin: 1,
      phoneNumber: 7600608432,
      email: "bhattsagar112@gmail.com",
      birthDate: "1998-11-02",
    });
    const objUserHarsh = new UserDetail({
      _id: 2,
      userName: "harsh",
      gender: "male",
      admin: 1,
      phoneNumber: 7600608432,
      email: "bhattharsh112@gmail.com",
      birthDate: "2008-11-19",
    });

    // const result = await objUser.save();
    const result = await UserDetail.insertMany([objUserSagar, objUserHarsh]);
    console.log(chalk.blue(result));
  } catch (err) {
    console.log(chalk.red(err));
  }
};
createUser();

// * Read Users
const readUsers = async () => {
  const result = await UserDetail.find();
  console.log(chalk.blue(result));
};
readUsers().catch((err) => console.log(chalk.red(err)));

// * Read Users Name
const readUserName = async () => {
  const result = await UserDetail.find().select({ name: 1 });
  // const result = await UserDetail.find().select({ name: 1 }).limit(1);
  console.log(chalk.blue(result));
};
readUserName().catch((err) => console.log(chalk.red(err)));

// * Comparison Query Operator: $gt, $lt, $gte, $lte, $eq, $ne, $in, $nin
// * Read Users birthDate > "1998-11-05"
const readUsersBirthDate = async () => {
  const result = await UserDetail.find({
    birthDate: { $gt: "1998-11-05" },
  }).select({ name: 1 });
  console.log(chalk.blue(result));
};
readUsersBirthDate().catch((err) => console.log(chalk.red(err)));

// * Logical Query Operator: $and, $or, $nor, $not
const readAdminUsers = async () => {
  const result = await UserDetail.find({
    $and: [{ admin: 1 }, { birthDate: { $gt: "1998-11-05" } }],
  }).select({ name: 1 });
  console.log(chalk.blue(result));
};
readAdminUsers().catch((err) => console.log(chalk.red(err)));

// * Counting Users
const countUsers = async () => {
  // const result = await UserDetail.find().count();
  const result = await UserDetail.find().countDocuments();
  console.log(chalk.blue(`Total Users ${result}`));
};
countUsers().catch((err) => console.log(chalk.red(err)));

// * Sorting Users
const sortUsers = async () => {
  const result = await UserDetail.find().select({ name: 1 }).sort({ name: 1 });
  console.log(chalk.blue(result));
};
sortUsers().catch((err) => console.log(chalk.red(err)));

// * Update Users
const updateUsers = async (_id) => {
  try {
    // * updateOne()
    // const result = await UserDetail.updateOne(
    //   { _id },
    //   { $set: { name: "sagar" } }
    // );
    // console.log(chalk.blue(JSON.stringify(result)));

    // * findByIdAndUpdate(): default returns old document
    const result = await UserDetail.findByIdAndUpdate(
      { _id },
      { $set: { name: "sagar" } },
      { new: true } // * returns new document
    );
    console.log(chalk.blue(result));
  } catch (err) {
    console.log(chalk.red(err));
  }
};
updateUsers(1);

// * Pagination
const pagination = async () => {
  const result = await UserDetail.find().skip(1).limit(1);
  console.log(chalk.blue(`page:1 - ${result}`));
};
pagination().catch((err) => console.log(chalk.red(err)));

// * Regular Expression
const regexName = async () => {
  const result = await UserDetail.find({
    name: { $regex: /^s/, $options: "i" },
  }).select({
    name: 1,
  });
  console.log(chalk.blue(`regex: ${result}`));
};
regexName().catch((err) => console.log(chalk.red(err)));

// * Delete Users
const deleteUsers = async (_id) => {
  try {
    // * deleteOne()
    // const result = await UserDetail.deleteOne({ _id });
    // console.log(chalk.blue(JSON.stringify(result)));
    // * deleteMany()
    const result = await UserDetail.deleteMany({});
    console.log(chalk.blue(JSON.stringify(result)));
    // * findByIdAndDelete(): default returns old document
    // const result = await UserDetail.findByIdAndDelete({ _id });
    // console.log(chalk.blue(result));
  } catch (err) {
    console.log(chalk.red(err));
  }
};
deleteUsers(1);

app.listen(port, () =>
  console.log(chalk.blue(`Server started on port: ${port}`))
);
