const DepartmentModel = require("../model/department.model");

class DepartmentDomain {
  // * GET ALL DEPARTMENTS
  AllDepartments() {
    return DepartmentModel.find();
  }
  async getAllDepartments(req, res) {
    const department = await this.AllDepartments();
    res.send(department);
  }
  // * GET DEPARTMENT
  async getDepartment(req, res) {
    let id = req.params.depId;
    const department = await DepartmentModel.findById(id);
    if (department) {
      res.send(department);
    } else {
      res.status(404).send("Department Not Found");
    }
  }
  // * ADD DEPARTMENT
  async insertDepartment(req, res) {
    try {
      let body = req.body;
      let data = {
        ...body,
        _id: (await this.AllDepartments()).length + 1,
      };
      const department = new DepartmentModel(data);
      const result = await department.save();
      res.send(result);
    } catch (e) {
      res.send(e.message);
    }
  }
  // * DELETE DEPARTMENT
  async deleteDepartment(req, res) {
    let id = req.params.depId;
    const department = await DepartmentModel.findByIdAndDelete(id);
    if (department) {
      res.json({
        message: "Department Record Deleted Successfully.",
        record: department,
      });
    } else {
      res.status(404).send("Data Not Found");
    }
  }
  // * UPDATE DEPARTMENT
  async updateDepartment(req, res) {
    try {
      let _id = req.params.depId;
      let data = req.body;
      const department = await DepartmentModel.findByIdAndUpdate(
        { _id },
        { $set: data },
        { new: 1 }
      );
      if (department) {
        res.json({
          message: "Department Record Updated Successfully.",
          record: department,
        });
      } else {
        res.status(404).send("Data Not Found");
      }
    } catch (e) {
      res.send(e.message);
    }
  }
}

module.exports = DepartmentDomain;
