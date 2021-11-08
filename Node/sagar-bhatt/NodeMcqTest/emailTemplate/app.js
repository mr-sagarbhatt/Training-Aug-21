const chalk = require("chalk");
const { readFile, writeFile } = require("fs").promises;

const data = [
  "bhattsagar112@gmail.com",
  "bhattsagar113@gmail.com",
  "bhattsagar114@gmail.com",
  "bhattsagar115@gmail.com",
  "bhattsagar116@gmail.com",
];

const createRecipient = async () => {
  await writeFile("recipient.txt", data.toString());
};

createRecipient().catch((err) => console.error(chalk.red(err)));

const readRecipient = async () => {
  let data = await readFile("recipient.txt");
  data = data.toString().split(",");
  console.log(data);
};

readRecipient().catch((err) => console.error(chalk.red(err)));
