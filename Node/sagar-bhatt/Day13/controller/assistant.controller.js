const AssistantDomain = require("../domain/assistants.domain");
var express = require("express");
var router = express.Router();

class AssistantController {
  // * ALL ASSISTANTS
  static async get(req, res) {
    const assistantDomain = new AssistantDomain();
    assistantDomain.getAllAssistant(req, res);
  }
  // * GET ASSISTANT
  static async getAssistant(req, res) {
    const assistantDomain = new AssistantDomain();
    assistantDomain.getAssistant(req, res);
  }
  // * INSERT ASSISTANT
  static async insertAssistant(req, res) {
    const assistantDomain = new AssistantDomain();
    assistantDomain.insertAssistant(req, res);
  }
  // * DELETE ASSISTANT
  static async deleteAssistant(req, res) {
    const assistantDomain = new AssistantDomain();
    assistantDomain.deleteAssistant(req, res);
  }
  // * UPDATE ASSISTANT
  static async updateAssistant(req, res) {
    const assistantDomain = new AssistantDomain();
    assistantDomain.updateAssistant(req, res);
  }
}

router.get("/", AssistantController.get);
router.get("/:astId", AssistantController.getAssistant);
router.post("/", AssistantController.insertAssistant);
router.delete("/:astId", AssistantController.deleteAssistant);
router.put("/:astId", AssistantController.updateAssistant);

module.exports = router;
