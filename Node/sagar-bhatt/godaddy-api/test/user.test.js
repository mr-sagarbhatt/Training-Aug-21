const chalk = require("chalk");
const chai = require("chai");
// const assert = require("chai").assert;
const expect = require("chai").expect;
// const should = require("chai").should();
chai.should();
const chaiHttp = require("chai-http");
const server = require("../app");

chai.use(chaiHttp);

const SERVICE_API_URL = "/service";

// * describe: Defines a block of tests. :: describe(comment, callback)
// * it: Defines a single test. . :: it(comment, callback)
describe(chalk.magentaBright("TEST SERVICE API"), () => {
  let token = "";
  let serviceId;

  before(async () => {
    const res = await chai.request(server).post("/users/login").send({
      user: "sagar",
      password: "Sagar@112",
      authTypeId: 3,
    });
    expect(res.status).to.equal(200);
    token = res.body.token; // * SET USER TOKEN
  });

  /**
   * * GET ROUTES
   */
  describe(chalk.blueBright("GET /service"), () => {
    // *********** Asynchronous Code ***********
    // ? 3 ways :: using done, using async/await, using promises

    // *  1: done
    // * Assertion style : BDD :: should
    it(chalk.blueBright("should return all services :: done"), (done) => {
      chai
        .request(server)
        .get(SERVICE_API_URL)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.an("array");
          done();
        });
    });

    // * 2: Async-await
    // * Assertion style : BDD :: expect
    it(
      chalk.blueBright("should return all services :: async-await"),
      async () => {
        const response = await chai.request(server).get(SERVICE_API_URL);
        expect(response.status, "status should be 200").to.equal(200); // * custom error message
        expect(response.body, "services should be an array").to.be.an("array"); // * custom error message
      }
    );

    // * 3: Promises
    // * Assertion style : BDD :: expect
    it(chalk.blueBright("should return all services :: promises"), () => {
      return chai
        .request(server)
        .get(SERVICE_API_URL)
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an("array");
        });
    });

    it(chalk.blueBright("should have valid services"), async () => {
      const res = await chai.request(server).get(SERVICE_API_URL);

      // res.should.have.status(200);
      expect(res.status).to.equal(200);
      // res.body.should.be.an("array");
      expect(res.body).to.be.an("array");

      const services = res.body;

      services.map((service) => {
        expect(service).to.be.an("object");
        // expected object keys
        expect(service).to.have.property("_id").that.is.a("number");
        expect(service).to.have.property("__v").that.is.a("number");
        expect(service).to.have.property("createdAt").that.is.a("string");
        expect(service).to.have.property("extra").that.is.an("array");
        expect(service).to.have.property("isActive").that.is.a("boolean");
        expect(service).to.have.property("name").that.is.a("string");
        expect(service).to.have.property("slug").that.is.a("string");
        expect(service).to.have.property("updatedAt").that.is.a("string");

        // expected object keys type
        // expect(service._id).to.be.a("number");
        // expect(service.name).to.be.a("string");
        // expect(service.slug).to.be.a("string");
        // expect(service.extra).to.be.an("array");
        // expect(service.isActive).to.be.a("boolean");
        // expect(service.createdAt).to.be.a("string");
        // expect(service.updatedAt).to.be.a("string");
        // expect(service.__v).to.be.a("number");
        // expect(service.desc).to.be.a("string");
      });
    });

    it(chalk.blueBright("should not return all services"), async () => {
      const res = await chai.request(server).get("/services");

      expect(res.status).to.equal(404);
      expect(res.body).to.be.an("object");
    });
  });

  /**
   * * POST ROUTES
   */
  describe(chalk.blueBright("POST /service"), () => {
    it(chalk.blueBright("should create a new service"), async () => {
      const res = await chai
        .request(server)
        .post(SERVICE_API_URL)
        .send({
          name: "test service",
          slug: "test-service",
        })
        .set("X-access-token", token);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.all.keys(
        "_id",
        "__v",
        "createdAt",
        "extra",
        "isActive",
        "name",
        "slug",
        "updatedAt"
      );

      serviceId = res.body._id; // * SET SERVICE ID
    });
  });

  /**
   * * PUT ROUTES
   */
  describe(chalk.blueBright("PUT /service"), () => {
    it(chalk.blueBright("should update a service"), async () => {
      const res = await chai
        .request(server)
        .put(`${SERVICE_API_URL}/${serviceId}`)
        .send({
          name: "test service updated",
          slug: "test-service-updated",
        })
        .set("X-access-token", token); // set header :: access token

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");

      // should contain all the given properties
      // expect(res.body).to.have.all.keys(
      //   "_id",
      //   "__v",
      //   "createdAt",
      //   "extra",
      //   "isActive",
      //   "name",
      //   "slug",
      //   "updatedAt"
      // );

      // should contain individual properties
      expect(res.body)
        .to.have.property("_id")
        .that.is.a("number")
        .eq(serviceId);
      expect(res.body).to.have.property("__v");
      expect(res.body).to.have.property("createdAt");
      expect(res.body).to.have.property("extra");
      expect(res.body).to.have.property("isActive");
      expect(res.body).to.have.property("name");
      expect(res.body).to.have.property("slug");
      expect(res.body).to.have.property("updatedAt");
    });
  });

  /**
   * * PUT ROUTES
   */
  describe(chalk.blueBright("DELETE /service"), () => {
    it(chalk.blueBright("should delete a service"), async () => {
      const res = await chai
        .request(server)
        .delete(`${SERVICE_API_URL}/${serviceId}`)
        .set("X-access-token", token); // set header :: access token

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });
  });
});
