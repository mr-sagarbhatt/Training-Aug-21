// * Extending EventEmitter Class
const EventEmitter = require("events");
// const eventEmitter = new EventEmitter();

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    this.emit("loggerEvent", "Calling from log method.");
  }
}

module.exports = Logger;
