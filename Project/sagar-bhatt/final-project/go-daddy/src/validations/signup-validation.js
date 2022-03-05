// *********** VALIDATE FORM VALUES :: return error object ***********
const validateFormValues = (values) => {
  const { userName, email, password } = values;
  const errors = {};
  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{9,15}$/;

  // *********** EMAIL VALIDATION ***********
  if (!email) {
    errors.email = `Email must be in a valid email format(e.g., username@coolexample.com). Please try again.`;
  } else if (!emailRegex.test(email)) {
    errors.email = `Email must be in a valid email format(e.g., username@coolexample.com). Please try again.`;
  }
  // *********** USERNAME VALIDATION ***********
  if (!userName) {
    errors.userName = `Contain at least 1 letter`;
  } else if (userName.length < 5 || userName.length > 50) {
    errors.userName = `Be between 5-50 characters`;
  }
  // *********** PASSWORD VALIDATION ***********
  if (!password || password.length < 9) {
    errors.password = `Password must be at least 9 characters.`;
  } else if (!passwordRegex.test(password)) {
    errors.password = `Password must be 9 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.`;
  }
  return errors;
};

export { validateFormValues };
