// *********** VALIDATE FORM VALUES :: return error object ***********
const validateFormValues = (values) => {
  const { user, password } = values;
  const errors = {};

  // *********** EMPTY FIELDS VALIDATION ***********
  if (user.length === "") {
    errors.user = `This field can't be empty`;
  }
  if (password.length === "") {
    errors.password = `This field can't be empty`;
  }
  return errors;
};

export { validateFormValues };
