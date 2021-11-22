const chalk = require("chalk");
const { readFile, writeFile } = require("fs").promises;

const data = ["bhattsagar112@gmail.com", "sagarbhatt298@gmail.com"];

// * ADD DATA TO FILE: recipient.txt
const createRecipient = async () => {
  await writeFile("recipient.txt", data.toString());
};

createRecipient().catch((err) => console.error(chalk.red(err)));

// * READ DATA FROM FILE: recipient.txt
const readRecipient = async () => {
  let data = await readFile("recipient.txt");
  data = data.toString().split(",");
  return data;
};

const recipients = readRecipient().catch((err) =>
  console.error(chalk.red(err))
);

const { sendMail } = require("./nodemailer");
sendMail(recipients);
