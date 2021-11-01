// * os
const os = require("os");

console.log(os.EOL);
console.log(os.constants.errno);
console.log(os.constants.signals);

console.log(os.arch());
console.log(os.cpus());
console.log(os.endianness());
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.homedir());
console.log(os.hostname());
console.log(os.loadavg());
console.log(os.networkInterfaces());
console.log(os.platform());
console.log(os.release());
console.log(os.tmpdir());
console.log(os.type());
console.log(os.uptime());
console.log(os.userInfo());

// * os
// TODO: https://nodejs.dev/learn/the-nodejs-os-module , https://nodejs.dev/learn/the-nodejs-os-module
// ? This module provides many functions that you can use to retrieve information from the underlying operating system and the computer the program runs on, and interact with it.
