const { connect } = require("mongoose");
const { serverLogging } = require("./logging");
require("dotenv").config();

module.exports = function () {
  // *********** MONGODB CONNECTION ***********
  const mongoDb = process.env.DATABASE;
  connectDb(mongoDb);
};

async function connectDb(mongoDb) {
  try {
    await connect(mongoDb);
    serverLogging.info(`MongoDb Connected!`);
  } catch (err) {
    serverLogging.error(err);
  }
}
