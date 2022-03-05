const ServiceDomain = require("../domains/service.domain");
const express = require("express");
const router = express.Router();
const verifyToken = require("../authentication/verifyToken");
const { authPage } = require("../authentication/authorization");

class ServiceController {
  // *********** GET ALL SERVICES ***********
  static getAllServices(req, res) {
    const serviceDomain = new ServiceDomain();
    serviceDomain.getAllServices(req, res);
  }
  // *********** CREATE SERVICE ***********
  static createService(req, res) {
    const serviceDomain = new ServiceDomain();
    serviceDomain.createService(req, res);
  }
  // *********** UPDATE SERVICE ***********
  static updateService(req, res) {
    const serviceDomain = new ServiceDomain();
    serviceDomain.updateService(req, res);
  }
  // *********** DELETE/DEACTIVATE SERVICE ***********
  static deleteService(req, res) {
    const serviceDomain = new ServiceDomain();
    serviceDomain.deleteService(req, res);
  }
  // *********** ACTIVATE SERVICE ***********
  static activateService(req, res) {
    const serviceDomain = new ServiceDomain();
    serviceDomain.activateService(req, res);
  }
}

// *********** SERVICE ROUTES ***********
router.get("/", ServiceController.getAllServices);
router.post("/", verifyToken, authPage([1]), ServiceController.createService);
router.put(
  "/:serviceId",
  verifyToken,
  authPage([1]),
  ServiceController.updateService
);
router.delete(
  "/:serviceId",
  verifyToken,
  authPage([1]),
  ServiceController.deleteService
);
router.put(
  "/activate/:serviceId",
  verifyToken,
  authPage([1]),
  ServiceController.activateService
);

module.exports = router;
