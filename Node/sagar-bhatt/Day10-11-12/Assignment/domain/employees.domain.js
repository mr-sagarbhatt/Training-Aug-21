const EmployeeModel = require("../model/employee.model");

class EmployeeDomain {
  // * GET ALL EMPLOYEES
  async getAllEmployees(req, res) {
    try {
      const result = await EmployeeModel.find();
      if (result) {
        res.send(result);
      } else {
        res.status(401).json({
          message: "No Employees Found!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  }

  // * GET AN EMPLOYEE
  async getAnEmployee(req, res) {
    try {
      const _id = req.params.id;
      const result = await EmployeeModel.findById({ _id });
      if (result) {
        res.send(result);
      } else {
        res.status(401).json({
          message: "Employee Not Found!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  }

  // * CREATE AN EMPLOYEE
  async createAnEmployee(req, res) {
    try {
      const data = req.body;
      const employee = new EmployeeModel(data);
      const result = await employee.save();
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  }

  // * DELETE AN EMPLOYEE
  async deleteAnEmployee(req, res) {
    try {
      const _id = req.params.id;
      const result = await EmployeeModel.findByIdAndDelete({ _id });
      if (result) {
        res.send(result);
      } else {
        res.status(401).json({
          message: "Employee Not Found!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  }

  // * UPDATE AN EMPLOYEE
  async updateAnEmployee(req, res) {
    try {
      const _id = req.params.id;
      const data = req.body;
      const result = await EmployeeModel.findByIdAndUpdate(
        { _id },
        { $set: data },
        { new: 1 }
      );
      if (result) {
        res.send(result);
      } else {
        res.status(401).json({
          message: "Employee Not Found!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  }

  // * GET ALL ASSIGNMENTS
  async getAllAssignments(req, res) {
    try {
      const _id = req.params.id;
      const result = await EmployeeModel.findById({ _id });
      if (result) {
        res.send(result.assignments);
      } else {
        res.status(401).json({
          message: "Employee Not Found!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  }

  // * GET AN ASSIGNMENT
  async getAssignment(req, res) {
    try {
      const _id = req.params.id;
      const assignmentId = parseInt(req.params.assignmentId);
      const employee = await EmployeeModel.findById({ _id });
      if (employee) {
        const result = await employee.assignments.find(
          (elem) => elem._id === assignmentId
        );
        if (result) {
          res.send(result);
        } else {
          res.status(401).json({
            message: "Assignment Not Found!",
          });
        }
      } else {
        res.status(401).json({
          message: "Employee Not Found!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  }

  // * CREATE AN ASSIGNMENT
  async createAssignment(req, res) {
    try {
      const _id = req.params.id;
      const data = req.body;
      const employee = await EmployeeModel.findById({ _id });
      if (employee) {
        employee.assignments.addToSet(data);
        employee.save();
        res.send(employee);
      } else {
        res.status(401).json({
          message: "Employee Not Found!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  }

  // * DELETE AN ASSIGNMENT
  async deleteAssignment(req, res) {
    try {
      const _id = req.params.id;
      const assignmentId = parseInt(req.params.assignmentId);
      const employee = await EmployeeModel.findById({ _id });
      if (employee) {
        const result = employee.assignments.id(assignmentId);
        if (result) {
          result.remove();
          employee.save();
          res.send(result);
        } else {
          res.status(401).json({
            message: "Assignment Not Found!",
          });
        }
      } else {
        res.status(401).json({
          message: "Employee Not Found!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  }

  // * UPDATE AN ASSIGNMENT
  async updateAssignment(req, res) {
    try {
      const data = req.body;
      const _id = req.params.id;
      const assignmentId = parseInt(req.params.assignmentId);
      const employee = await EmployeeModel.findById({ _id });
      if (employee) {
        const result = await EmployeeModel.findOneAndUpdate(
          { _id: _id, "assignments._id": assignmentId },
          { $set: { "assignments.$": data } },
          { new: 1 }
        );
        if (result) {
          res.send(result);
        } else {
          res.status(401).json({
            message: "Assignment Not Found!",
          });
        }
      } else {
        res.status(401).json({
          message: "Employee Not Found!",
        });
      }
    } catch (err) {
      res.send(err);
    }
  }
}

module.exports = EmployeeDomain;
