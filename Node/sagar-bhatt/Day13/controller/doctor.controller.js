var express = require("express");
const DoctorDomain = require("../domain/doctors.domain");
var router = express.Router();

class DoctorController {
  // * ALL DOCTORS
  static async get(req, res) {
    const doctorDomain = new DoctorDomain();
    doctorDomain.getAllDoctors(req, res);
  }
  // * GET DOCTOR
  static async getDoctor(req, res) {
    const doctorDomain = new DoctorDomain();
    doctorDomain.getDoctor(req, res);
  }
  // * INSERT DOCTOR
  static async insertDoctor(req, res) {
    const doctorDomain = new DoctorDomain();
    doctorDomain.insertDoctor(req, res);
  }
  // * UPDATE DOCTOR
  static async updateDoctor(req, res) {
    const doctorDomain = new DoctorDomain();
    doctorDomain.updateDoctor(req, res);
  }
  // * DELETE DOCTOR
  static async deleteDoctor(req, res) {
    const doctorDomain = new DoctorDomain();
    doctorDomain.deleteDoctor(req, res);
  }
  // * GET SUMMARY
  static async getSummary(req, res) {
    const doctorDomain = new DoctorDomain();
    doctorDomain.getSummary(req, res);
  }
  // * GET PATIENT
  static async getPatient(req, res) {
    const doctorDomain = new DoctorDomain();
    doctorDomain.getPatient(req, res);
  }
}

router.get("/", DoctorController.get);
router.get("/:docId", DoctorController.getDoctor);
router.delete("/:docId", DoctorController.deleteDoctor);
router.post("/", DoctorController.insertDoctor);
router.put("/:docId", DoctorController.updateDoctor);
router.get("/:docId/summary", DoctorController.getSummary);
router.get("/:docId/patients/:patId", DoctorController.getPatient);

module.exports = router;
