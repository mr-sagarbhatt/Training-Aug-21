const PatientDomain = require("../domain/patients.domain");
var express = require("express");
var router = express.Router();

class PatientController {
  // * ALL PATIENTS
  static async get(req, res) {
    const patientDomain = new PatientDomain();
    patientDomain.getAllPatients(req, res);
  }
  // * GET PATIENT
  static async getPatient(req, res) {
    const patientDomain = new PatientDomain();
    patientDomain.getPatient(req, res);
  }
  // * INSERT PATIENT
  static async insertPatient(req, res) {
    const patientDomain = new PatientDomain();
    patientDomain.insertPatient(req, res);
  }
  // * UPDATE PATIENT
  static async updatePatient(req, res) {
    const patientDomain = new PatientDomain();
    patientDomain.updatePatient(req, res);
  }
  // * DELETE PATIENT
  static async deletePatient(req, res) {
    const patientDomain = new PatientDomain();
    patientDomain.deletePatient(req, res);
  }
  // * GET PATIENT'S MEDICINES
  static async getPatientMedicine(req, res) {
    const patientDomain = new PatientDomain();
    patientDomain.getPatientMedicine(req, res);
  }
}

router.get("/", PatientController.get);
router.get("/:patId", PatientController.getPatient);
router.delete("/:patId", PatientController.deletePatient);
router.post("/", PatientController.insertPatient);
router.put("/:patId", PatientController.updatePatient);
router.get("/:patId/medicines", PatientController.getPatientMedicine);

module.exports = router;
