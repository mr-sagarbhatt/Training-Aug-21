module.exports = async () => {
  // *********** CREATE ROLES ***********
  const { createRole } = require("../utils/functions");
  // ? on load :: create admin and customer roles if not exits
  await createRole({
    role: "admin",
  });
  await createRole({
    role: "customer",
  });

  // *********** CREATE AUTH TYPE ***********
  const { createAuthType } = require("../utils/functions");
  // ? on load :: create google, facebook and password auth types if not exits
  await createAuthType({
    authType: "google",
  });
  await createAuthType({
    authType: "facebook",
  });
  await createAuthType({
    authType: "password",
  });
};
