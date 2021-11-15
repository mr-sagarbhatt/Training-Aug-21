const MedicineModel = require("../model/medicine.model");

class MedicineDomain {
  // * GET ALL MEDICINE
  allMedicines() {
    return MedicineModel.find();
  }
  async getAllMedicines(req, res) {
    const medicines = await this.allMedicines();
    res.send(medicines);
  }
  // * GET MEDICINE
  async getMedicine(req, res) {
    let id = req.params.medId;
    const medicine = await MedicineModel.findById(id);
    if (medicine) {
      res.send(medicine);
    } else {
      res.status(404).send("Medicine Not Found");
    }
  }
  // * ADD MEDICINE
  async insertMedicine(req, res) {
    try {
      let body = req.body;
      let data = {
        ...body,
        _id: (await this.allMedicines()).length + 1,
      };
      const medicine = new MedicineModel(data);
      const result = await medicine.save();
      res.send(result);
    } catch (e) {
      res.send(e.message);
    }
  }
  // * DELETE MEDICINE
  async deleteMedicine(req, res) {
    let id = req.params.medId;
    const medicine = await MedicineModel.findByIdAndDelete(id);
    if (medicine) {
      res.json({
        message: "Medicine Record Deleted Successfully.",
        record: medicine,
      });
    } else {
      res.status(404).send("Data Not Found");
    }
  }
  // * UPDATE MEDICINE
  async updateMedicine(req, res) {
    try {
      let _id = req.params.medId;
      let data = req.body;
      const medicine = await MedicineModel.findByIdAndUpdate(
        { _id },
        { $set: data },
        { new: 1 }
      );
      if (medicine) {
        res.json({
          message: "Medicine Record Updated Successfully.",
          record: medicine,
        });
      } else {
        res.status(404).send("Data Not Found");
      }
    } catch (e) {
      res.send(e.message);
    }
  }
}

module.exports = MedicineDomain;
