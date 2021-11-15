const PatientModel = require("../model/patient.model");

class PatientDomain {
  // * ALL PATIENTS
  allPatients() {
    return PatientModel.find().populate(
      "department medicines.medicine",
      "name"
    );
  }
  async getAllPatients(req, res) {
    const patients = await this.allPatients();
    res.send(patients);
  }
  // * GET PATIENT
  async getPatient(req, res) {
    let id = req.params.patId;
    const patient = await PatientModel.findById(id).populate(
      "department medicines.medicine",
      "name"
    );
    // .populate("medicines.medicine");
    if (patient) {
      res.send(patient);
    } else {
      res.status(404).send("Patient Not Found");
    }
  }
  // * INSERT PATIENT
  async insertPatient(req, res) {
    let body = req.body;
    const data = {
      ...body,
      _id: (await this.allPatients()).length + 1,
    };
    const patient = new PatientModel(data);
    try {
      const result = await patient.save();
      res.send(result);
    } catch (e) {
      res.send(e.message);
    }
  }
  // * DELETE PATIENT
  async deletePatient(req, res) {
    let _id = req.params.patId;
    const patient = await PatientModel.findByIdAndUpdate(
      { _id },
      {
        $set: { isDeleted: 1 },
      },
      { new: 1 }
    );
    if (patient) {
      res.json({
        message: "Patient Record Deleted Successfully.",
        record: patient,
      });
    } else {
      res.status(404).send("Data Not Found");
    }
  }
  // * UPDATE PATIENT
  async updatePatient(req, res) {
    try {
      let _id = req.params.patId;
      let data = req.body;
      const patient = await PatientModel.findByIdAndUpdate(
        { _id },
        { $set: data },
        { new: 1 }
      );
      if (patient) {
        res.json({
          message: "Patient Record Updated Successfully.",
          record: patient,
        });
      } else {
        res.status(404).send("Data Not Found");
      }
    } catch (e) {
      res.send(e.message);
    }
  }
  // * GET PATIENT'S MEDICINES
  async getPatientMedicine(req, res) {
    let id = req.params.patId;
    const patient = await PatientModel.findById(id)
      .populate("medicines.medicine", "name -_id")
      .select("medicines -_id");
    if (patient) {
      res.send(patient);
    } else {
      res.status(404).send("Patient Not Found");
    }
  }
}

module.exports = PatientDomain;
