// * Events / EventEmitter Class
// * The events module provides us the EventEmitter class, which is key to working with events in Node.js.

// * The event listener has these in-built events:
// ? newListener when a listener is added
// emitter.on() Alias for emitter.addListener()
// emitter.emit() : Emits an event. It synchronously calls every event listener in the order they were registered.
// ? removeListener when a listener is removed
// emitter.off() Alias for emitter.removeListener()
// emitter.removeAllListeners();

// emitter.once()

const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

console.log(eventEmitter.eventNames()); // Return an array of strings that represent the events registered on the current EventEmitter object:

// * Create an event handler:
const newEventHandler = () => {
  console.log("newEvent Handler");
};

// * Assign the event handler to an event:
eventEmitter.on("newEvent", newEventHandler);
// eventEmitter.addListener("newEvent", newEventHandler);

// * Fire the event:
eventEmitter.emit("newEvent");

console.log(eventEmitter.eventNames());

console.log(eventEmitter.getMaxListeners());
eventEmitter.setMaxListeners(20);
console.log(eventEmitter.getMaxListeners());

console.log(eventEmitter.eventNames());

eventEmitter.addListener("newEvent", () => {
  console.log("Second Event Handler");
});

eventEmitter.emit("newEvent");

console.log(eventEmitter.listeners("newEvent"));
console.log(eventEmitter.listenerCount("newEvent"));

// * Remove the event handle from an event:
// eventEmitter.off("newEvent", newEventHandler);
// eventEmitter.removeListener("newEvent", newEventHandler);
eventEmitter.removeAllListeners("newEvent");

eventEmitter.once("eventOnce", () => {
  console.log("Called Once.");
});

eventEmitter.emit("eventOnce");
eventEmitter.listenerCount("eventOnce");

const Logger = require("./logger");
const objLogger = new Logger();

objLogger.on("loggerEvent", (arg) => {
  console.log(`Logger Event ${arg}`);
});

objLogger.log("Extending EventEmitter Class.");

// * events
// TODO: https://nodejs.dev/learn/the-nodejs-events-module
// ? The events module provides us the EventEmitter class, which is key to working with events in Node.js.
