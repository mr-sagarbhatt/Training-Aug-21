const MedicineDomain = require("../domain/medicines.domain");
const express = require("express");
const router = express.Router();

class MedicineController {
  // * GET ALL MEDICINES
  static async get(req, res) {
    const medicineDomain = new MedicineDomain();
    medicineDomain.getAllMedicines(req, res);
  }
  // * GET MEDICINE
  static async getMedicine(req, res) {
    const medicineDomain = new MedicineDomain();
    medicineDomain.getMedicine(req, res);
  }
  // * ADD MEDICINE
  static async insertMedicine(req, res) {
    const medicineDomain = new MedicineDomain();
    medicineDomain.insertMedicine(req, res);
  }
  // * DELETE MEDICINE
  static async deleteMedicine(req, res) {
    const medicineDomain = new MedicineDomain();
    medicineDomain.deleteMedicine(req, res);
  }
  // * UPDATE MEDICINE
  static async updateMedicine(req, res) {
    const medicineDomain = new MedicineDomain();
    medicineDomain.updateMedicine(req, res);
  }
}

router.get("/", MedicineController.get);
router.get("/:medId", MedicineController.getMedicine);
router.post("/", MedicineController.insertMedicine);
router.delete("/:medId", MedicineController.deleteMedicine);
router.put("/:medId", MedicineController.updateMedicine);

module.exports = router;
