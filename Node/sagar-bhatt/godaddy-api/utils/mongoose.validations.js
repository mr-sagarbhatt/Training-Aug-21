// *********** USER MODEL VALIDATION ***********
// * VALIDATE USER EMAIL *
function validateUserEmail(value) {
  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
  return emailRegex.test(value);
}

// *********** PROFILE MODEL VALIDATION ***********
// * VALIDATE INTERNATIONAL PHONE NUMBERS *
function validatePhoneNo(value) {
  const regex =
    /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/;
  return regex.test(value);
}

module.exports = { validatePhoneNo, validateUserEmail };
