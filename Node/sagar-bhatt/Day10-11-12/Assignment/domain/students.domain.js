const StudentModel = require("../model/student.model");

class StudentDomain {
  // * GET ALL STUDENTS
  async getAllStudents(req, res) {
    try {
      const result = await StudentModel.find();
      if (result) {
        res.send(result);
      } else {
        res.status(401).json({
          message: "No Students Found!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  }

  // * GET STUDENT
  async getStudent(req, res) {
    try {
      const _id = req.params.id;
      const result = await StudentModel.findById({ _id });
      if (result) {
        res.send(result);
      } else {
        res.status(401).json({
          message: "Student Not Found!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  }

  // * CREATE STUDENT
  async createStudent(req, res) {
    try {
      const data = req.body;
      const student = new StudentModel(data);
      const result = await student.save();
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  }

  // * DELETE STUDENT
  async deleteStudent(req, res) {
    try {
      const _id = req.params.id;
      const result = await StudentModel.findByIdAndDelete({ _id });
      if (result) {
        res.send(result);
      } else {
        res.status(401).json({
          message: "Student Not Found!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  }

  // * UPDATE STUDENT
  async updateStudent(req, res) {
    try {
      const _id = req.params.id;
      const data = req.body;
      const result = await StudentModel.findByIdAndUpdate(
        { _id },
        { $set: data },
        { new: 1 }
      );
      if (result) {
        res.send(result);
      } else {
        res.status(401).json({
          message: "Student Not Found!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  }

  // * GET FEES
  async getFees(req, res) {
    try {
      const _id = req.params.id;
      const student = await StudentModel.findById({ _id });
      if (student) {
        res.send(student.fees);
      } else {
        res.status(401).json({
          message: "Student Not Found!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  }

  // * GET RESULT
  async getResult(req, res) {
    try {
      const _id = req.params.id;
      const student = await StudentModel.findById({ _id });
      if (student) {
        res.send(student.result);
      } else {
        res.status(401).json({
          message: "Student Not Found!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  }
}

module.exports = StudentDomain;
