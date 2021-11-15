const AssistantModel = require("../model/assistant.model");

class AssistantDomain {
  // * ALL ASSISTANTS
  allAssistants() {
    return AssistantModel.find();
  }
  async getAllAssistant(req, res) {
    const assistant = await this.allAssistants();
    res.send(assistant);
  }
  // * GET ASSISTANT
  async getAssistant(req, res) {
    let id = req.params.astId;
    const assistant = await AssistantModel.findById(id);
    if (assistant) {
      res.send(assistant);
    } else {
      res.status(404).send("Assistant Not Found");
    }
  }
  // * INSERT ASSISTANT
  async insertAssistant(req, res) {
    try {
      let body = req.body;
      let data = {
        ...body,
        _id: (await this.allAssistants()).length + 1,
      };
      const assistant = new AssistantModel(data);
      const result = await assistant.save();
      res.send(result);
    } catch (e) {
      res.send(e.message);
    }
  }
  // * DELETE ASSISTANT
  async deleteAssistant(req, res) {
    let _id = req.params.astId;
    const assistant = await AssistantModel.findByIdAndUpdate(
      { _id },
      {
        $set: { isDeleted: 1 },
      },
      { new: 1 }
    );
    if (assistant) {
      res.json({
        message: "Assistant Record Deleted Successfully.",
        record: assistant,
      });
    } else {
      res.status(404).send("Data Not Found");
    }
  }
  // * UPDATE ASSISTANT
  async updateAssistant(req, res) {
    try {
      let _id = req.params.astId;
      let data = req.body;
      const assistant = await AssistantModel.findByIdAndUpdate(
        { _id },
        { $set: data },
        { new: 1 }
      );
      if (assistant) {
        res.json({
          message: "Assistant Record Updated Successfully.",
          record: assistant,
        });
      } else {
        res.status(404).send("Data Not Found");
      }
    } catch (e) {
      res.send(e.message);
    }
  }
}

module.exports = AssistantDomain;
