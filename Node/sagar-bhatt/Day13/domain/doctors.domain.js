const DoctorModel = require("../model/doctor.model");

class DoctorDomain {
  // * ALL DOCTORS
  allDoctors() {
    return DoctorModel.find();
  }
  async getAllDoctors(req, res) {
    const doctors = await this.allDoctors();
    res.send(doctors);
  }
  // * GET DOCTOR
  async getDoctor(req, res) {
    let id = req.params.docId;
    const doctor = await DoctorModel.findById(id).populate("patients");
    if (doctor) {
      res.send(doctor);
    } else {
      res.status(404).send("Doctor Not Found");
    }
  }
  // * INSERT DOCTOR
  async insertDoctor(req, res) {
    try {
      let body = req.body;
      let data = {
        ...body,
        _id: (await this.allDoctors()).length + 1,
      };
      const doctor = new DoctorModel(data);
      const result = await doctor.save();
      res.send(result);
    } catch (e) {
      res.send(e.message);
    }
  }
  // * DELETE DOCTOR
  async deleteDoctor(req, res) {
    let _id = req.params.docId;
    const doctor = await DoctorModel.findByIdAndUpdate(
      { _id },
      {
        $set: { isDeleted: 1 },
      },
      { new: 1 }
    );
    if (doctor) {
      res.json({
        message: "Doctor Record Deleted Successfully.",
        record: doctor,
      });
    } else {
      res.status(404).send("Data Not Found");
    }
  }
  // * UPDATE DOCTOR
  async updateDoctor(req, res) {
    try {
      let _id = req.params.docId;
      let data = req.body;
      const doctor = await DoctorModel.findByIdAndUpdate(
        { _id },
        { $set: data },
        { new: 1 }
      );
      if (doctor) {
        res.json({
          message: "Doctor Record Updated Successfully.",
          record: doctor,
        });
      } else {
        res.status(404).send("Data Not Found");
      }
    } catch (e) {
      res.send(e.message);
    }
  }
  // * GET SUMMARY
  async getSummary(req, res) {
    let id = req.params.docId;
    const doctors = await DoctorModel.findById(id)
      .populate({
        path: "patients",
        populate: { path: "department" },
      })
      .populate({
        path: "patients",
        populate: { path: "medicines.medicine" },
      });
    if (doctors) {
      res.send(doctors);
    } else {
      res.status(404).send("Doctor Not Found");
    }
  }
  // * GET PATIENT
  async getPatient(req, res) {
    let id = req.params.docId;
    let pId = req.params.patId;
    const doctor = await DoctorModel.findById(id).populate("patients");
    if (doctor) {
      const result = doctor.patients.find((p) => p.id == pId);
      if (result) {
        res.send(result);
      } else {
        res.status(404).send("Patient Not Found");
      }
    } else {
      res.status(404).send("Doctor Not Found");
    }
  }
}

module.exports = DoctorDomain;
