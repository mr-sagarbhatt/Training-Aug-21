const https = require("https");
const options = {};

const req = https.request(
  {
    hostname: "gorest.co.in",
    //   port: 443,
    path: "/public-api/users",
    method: "GET",
  },
  (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (chunk) => {
      console.log(chunk);
      console.log(chunk.toString());
    });
  }
);

req.on("error", (error) => {
  console.error(error);
});

req.end();

// TODO: https://nodejs.dev/learn/making-http-requests-with-nodejs , https://nodejs.org/api/http.html#httprequesturl-options-callback
