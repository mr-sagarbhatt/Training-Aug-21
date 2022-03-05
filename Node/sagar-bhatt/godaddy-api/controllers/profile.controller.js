const ProfileDomain = require("../domains/profile.domain");
const express = require("express");
const router = express.Router();

class ProfileController {
  // *********** GET USER PROFILE ***********
  static getUserProfile(req, res) {
    const profileDomain = new ProfileDomain();
    profileDomain.getUserProfile(req, res);
  }
  // *********** UPDATE USER PROFILE ***********
  static updateUserProfile(req, res) {
    const profileDomain = new ProfileDomain();
    profileDomain.updateUserProfile(req, res);
  }
}

// *********** PROFILE ROUTES ***********
router.get("/:userId", ProfileController.getUserProfile);
router.put("/:userId", ProfileController.updateUserProfile);

module.exports = router;
