const Joi = require("joi");

const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{9,15}$/;

// *********** VALIDATE USER ROLES ***********
function validateRole(role) {
  const joiSchema = Joi.object({
    role: Joi.string()
      .trim()
      .max(20)
      .pattern(/^[a-z]+$/)
      .required()
      .messages({
        "string.base": `User role must be a type of string.`,
        "string.empty": `User role cannot be an empty.`,
        "string.max": `User role must be less than or equal to {#limit} characters.`,
        "string.pattern.base": `User role can only contain lowercase letters.`,
        "any.required": `User role is required.`,
      }),
  });
  return joiSchema.validate(role);
}

// *********** VALIDATE USER REGISTRATION ***********
function validateUser(user) {
  const joiSchema = Joi.object({
    email: Joi.string().trim().email().max(255).required().messages({
      "string.base": `Email must be a type of string.`,
      "string.empty": `Email cannot be an empty.`,
      "string.email": `Email must be a valid email address.`,
      "string.max": `Email must be less than or equal to {#limit} characters.`,
      "any.required": `Email is required.`,
    }),
    userName: Joi.string().trim().min(5).max(50).messages({
      "string.base": `Username must be a type of string.`,
      "string.empty": `Username cannot be an empty.`,
      "string.min": `Username must be greater than or equal to {#limit} characters.`,
      "string.max": `Username must be less than or equal to {#limit} characters.`,
    }),
    firebaseUId: Joi.string().trim().max(28).messages({
      "string.base": `firebase UId must be a type of string.`,
      "string.empty": `firebase UId cannot be an empty.`,
      "string.max": `firebase UId must be less than or equal to {#limit} characters.`,
    }),
    authTypeId: Joi.number().integer().positive().messages({
      "number.base": `Auth type id must be a type of number.`,
      "number.empty": `Auth type id cannot be an empty.`,
      "number.integer": `Auth type id must be positive integer.`,
      "number.positive": `Auth type id must be positive integer.`,
      // "any.required": `Auth type id is required.`,
    }),
    password: Joi.string()
      .trim()
      .min(9)
      .max(15)
      .pattern(passwordRegex)
      // .required()
      .messages({
        "string.base": `Password must be a type of string.`,
        "string.empty": `Password cannot be an empty.`,
        "string.min": `Password must be greater than or equal to {#limit} characters.`,
        "string.max": `Password must be less than or equal to {#limit} characters.`,
        "string.pattern.base": `Password must be 9 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.`,
        // "any.required": `Password is required.`,
      }),
  });
  return joiSchema.validate(user);
}

// *********** VALIDATE USER LOGIN ***********
function validateUserLogin(user) {
  const joiSchema = Joi.object({
    user: Joi.string().trim().min(5).max(255).required().messages({
      "string.base": `User must be a type of string.`,
      "string.empty": `User cannot be an empty.`,
      "string.min": `User must be greater than or equal to {#limit} characters.`,
      "string.max": `User must be less than or equal to {#limit} characters.`,
      "any.required": `User is required.`,
    }),
    firebaseUId: Joi.string().trim().max(28).messages({
      "string.base": `firebase UId must be a type of string.`,
      "string.empty": `firebase UId cannot be an empty.`,
      "string.max": `firebase UId must be less than or equal to {#limit} characters.`,
    }),
    authTypeId: Joi.number().integer().positive().required().messages({
      "number.base": `Auth type id must be a type of number.`,
      "number.empty": `Auth type id cannot be an empty.`,
      "number.integer": `Auth type id must be positive integer.`,
      "number.positive": `Auth type id must be positive integer.`,
      "any.required": `Auth type id is required.`,
    }),
    password: Joi.string()
      .trim()
      .min(8)
      .max(15)
      .pattern(passwordRegex)
      // .required()
      .messages({
        "string.base": `Password must be a type of string.`,
        "string.empty": `Password cannot be an empty.`,
        "string.min": `Password must be greater than or equal to {#limit} characters.`,
        "string.max": `Password must be less than or equal to {#limit} characters.`,
        "string.pattern.base": `Password must be 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.`,
        // "any.required": `Password is required.`,
      }),
  });
  return joiSchema.validate(user);
}

// *********** VALIDATE USER PROFILE ***********
const phoneRegex =
  /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/;
const faxRegex =
  /^(\+?\d{1,}(\s?|\-?)\d*(\s?|\-?)\(?\d{2,}\)?(\s?|\-?)\d{3,}\s?\d{3,})$/;
const postalCodeRegex = /^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/;

function validateUserProfile(user) {
  // *********** VALIDATE USER PROFILE : YUP ***********
  const joiSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      // .min(2)
      .max(20)
      .pattern(/^[a-z]+$/)
      .required()
      .messages({
        "string.base": `First name must be a type of string.`,
        "string.empty": `First name cannot be an empty.`,
        // "string.min": `First name must be greater than or equal to {#limit} characters.`,
        "string.max": `First name must be less than or equal to {#limit} characters.`,
        "string.pattern.base": `First name can only contain lowercase letters.`,
        "any.required": `First name is required.`,
      }),
    lastName: Joi.string()
      .trim()
      // .min(2)
      .max(20)
      .pattern(/^[a-z]+$/)
      .required()
      .messages({
        "string.base": `Last name must be a type of string.`,
        "string.empty": `Last name cannot be an empty.`,
        // "string.min": `Last name must be greater than or equal to {#limit} characters.`,
        "string.max": `Last name must be less than or equal to {#limit} characters.`,
        "string.pattern.base": `Last name can only contain lowercase letters.`,
        "any.required": `Last name is required.`,
      }),
    organization: Joi.string().trim().max(60).messages({
      "string.base": `Organization must be a type of string.`,
      "string.max": `Organization must be less than or equal to {#limit} characters.`,
    }),
    defaultCurrency: Joi.string().trim().max(20).messages({
      "string.base": `Currency must be a type of string.`,
      "string.max": `Currency must be less than or equal to {#limit} characters.`,
    }),
    primaryPhone: Joi.string().trim().pattern(phoneRegex).required().messages({
      "string.base": `Primary phone must be a type of string.`,
      "string.empty": `Primary phone cannot be an empty.`,
      "string.pattern.base": `Primary phone must be valid.`,
      "any.required": `Primary phone is required.`,
    }),
    mobilePhone: Joi.string().trim().pattern(phoneRegex).messages({
      "string.base": `Mobile phone must be a type of string.`,
      "string.pattern.base": `Mobile phone must be valid.`,
    }),
    homePhone: Joi.string().trim().pattern(phoneRegex).messages({
      "string.base": `Home phone must be a type of string.`,
      "string.pattern.base": `Home phone must be valid.`,
    }),
    fax: Joi.string().trim().pattern(faxRegex).messages({
      "string.base": `Fax must be a type of string.`,
      "string.pattern.base": `Fax must be valid.`,
    }),
    language: Joi.string().trim().max(20).messages({
      "string.base": `Language must be a type of string.`,
      "string.max": `Language must be less than or equal to {#limit} characters.`,
    }),
    country: Joi.string().trim().max(20).required().messages({
      "string.base": `Country must be a type of string.`,
      "string.empty": `Country cannot be an empty.`,
      "string.max": `Country must be less than or equal to {#limit} characters.`,
      "any.required": `Country is required.`,
    }),
    address1: Joi.string().max(100).trim().required().messages({
      "string.base": `Address1 must be a type of string.`,
      "string.empty": `Address1 cannot be an empty.`,
      "string.max": `Address1 must be less than or equal to {#limit} characters.`,
      "any.required": `Address1 is required.`,
    }),
    address2: Joi.string().max(100).trim().messages({
      "string.base": `Address2 must be a type of string.`,
      "string.max": `Address2 must be less than or equal to {#limit} characters.`,
    }),
    postalCode: Joi.string()
      .trim()
      .pattern(postalCodeRegex)
      .required()
      .messages({
        "string.base": `Postal code must be a type of string.`,
        "string.empty": `Postal code cannot be an empty.`,
        "string.pattern.base": `Postal code must be valid.`,
        "any.required": `Postal code is required.`,
      }),
    city: Joi.string().max(30).trim().required().messages({
      "string.base": `City must be a type of string.`,
      "string.empty": `City cannot be an empty.`,
      "string.max": `City must be less than or equal to {#limit} characters.`,
      "any.required": `City is required.`,
    }),
    state: Joi.string().max(30).trim().required().messages({
      "string.base": `State must be a type of string.`,
      "string.empty": `State cannot be an empty.`,
      "string.max": `State must be less than or equal to {#limit} characters.`,
      "any.required": `State is required.`,
    }),
  });
  return joiSchema.validate(user);
}

// *********** VALIDATE PROMO ***********
function validatePromo(promo) {
  const joiSchema = Joi.object({
    name: Joi.string().trim().max(30).required().messages({
      "string.base": `Promo code must be a type of string.`,
      "string.empty": `Promo code cannot be an empty.`,
      "string.max": `Promo code must be less than or equal to {#limit} characters.`,
      "any.required": `Promo code is required.`,
    }),
    desc: Joi.string().trim().max(1024).messages({
      "string.base": `Description must be a type of string.`,
      "string.empty": `Description cannot be an empty.`,
      "string.max": `Description must be less than or equal to {#limit} characters.`,
    }),
    amount: Joi.number().integer().positive().min(1).required().messages({
      "number.base": `Promo amount must be a type of number.`,
      "number.empty": `Promo amount cannot be an empty.`,
      "number.min": `Promo amount must be greater than or equal to {#limit}.`,
      "number.max": `Promo amount must be less than or equal to {#limit}.`,
      "any.required": `Promo amount is required.`,
    }),
    startTime: Joi.date().greater("now").required().messages({
      "date.base": `Promo start time must be a type of date.`,
      "date.empty": `Promo start time cannot be an empty.`,
      "date.greater": `Promo start time must be greater than or equal to current date and time.`,
      "any.required": `Promo start time is required.`,
    }),
    endTime: Joi.date().greater("now").required().messages({
      "date.base": `Promo end time must be a type of date.`,
      "date.empty": `Promo end time cannot be an empty.`,
      "date.greater": `Promo end time must be greater than or equal to current date and time.`,
      "any.required": `Promo end time is required.`,
    }),
  });
  return joiSchema.validate(promo);
}

// *********** VALIDATE SERVICE ***********
function validateService(service) {
  const joiSchema = Joi.object({
    name: Joi.string().trim().max(50).required().messages({
      "string.base": `Category name must be a type of string.`,
      "string.empty": `Category name cannot be an empty.`,
      "string.max": `Category name must be less than or equal to {#limit} characters.`,
      "any.required": `Category name is required.`,
    }),
    slug: Joi.string().trim().max(50).required().messages({
      "string.base": `Category slug must be a type of string.`,
      "string.empty": `Category slug cannot be an empty.`,
      "string.max": `Category slug must be less than or equal to {#limit} characters.`,
      "any.required": `Category slug is required.`,
    }),
    desc: Joi.string().trim().max(1024).messages({
      "string.base": `Description must be a type of string.`,
      "string.empty": `Description cannot be an empty.`,
      "string.max": `Description must be less than or equal to {#limit} characters.`,
    }),
    extra: Joi.array().items(Joi.string()).messages({
      "string.base": `extra must be array of string.`,
      "string.empty": `extra cannot be an empty.`,
    }),
  });
  return joiSchema.validate(service);
}

// *********** VALIDATE CATEGORY ***********
function validateCategory(category) {
  const joiSchema = Joi.object({
    name: Joi.string().trim().max(50).required().messages({
      "string.base": `Category name must be a type of string.`,
      "string.empty": `Category name cannot be an empty.`,
      "string.max": `Category name must be less than or equal to {#limit} characters.`,
      "any.required": `Category name is required.`,
    }),
    slug: Joi.string().trim().max(50).required().messages({
      "string.base": `Category slug must be a type of string.`,
      "string.empty": `Category slug cannot be an empty.`,
      "string.max": `Category slug must be less than or equal to {#limit} characters.`,
      "any.required": `Category slug is required.`,
    }),
    desc: Joi.string().trim().max(1024).messages({
      "string.base": `Description must be a type of string.`,
      "string.empty": `Description cannot be an empty.`,
      "string.max": `Description must be less than or equal to {#limit} characters.`,
    }),
    extra: Joi.array().items(Joi.string()).messages({
      "string.base": `extra must be array of string.`,
      "string.empty": `extra cannot be an empty.`,
    }),
    serviceId: Joi.number().integer().positive().required().messages({
      "number.base": `Service id must be a type of number.`,
      "number.empty": `Service id cannot be an empty.`,
      "number.integer": `Service id must be positive integer.`,
      "number.positive": `Service id must be positive integer.`,
      "any.required": `Service id is required.`,
    }),
  });
  return joiSchema.validate(category);
}

// *********** VALIDATE SUB CATEGORY ***********
function validateSubCategory(subCategory) {
  const joiSchema = Joi.object({
    name: Joi.string().trim().max(50).required().messages({
      "string.base": `SubCategory name must be a type of string.`,
      "string.empty": `SubCategory name cannot be an empty.`,
      "string.max": `SubCategory name must be less than or equal to {#limit} characters.`,
      "any.required": `SubCategory name is required.`,
    }),
    slug: Joi.string().trim().max(50).required().messages({
      "string.base": `SubCategory slug must be a type of string.`,
      "string.empty": `SubCategory slug cannot be an empty.`,
      "string.max": `SubCategory slug must be less than or equal to {#limit} characters.`,
      "any.required": `SubCategory slug is required.`,
    }),
    desc: Joi.string().trim().max(255).messages({
      "string.base": `Description must be a type of string.`,
      "string.empty": `Description cannot be an empty.`,
      "string.max": `Description must be less than or equal to {#limit} characters.`,
    }),
    extra: Joi.array().items(Joi.string()).messages({
      "string.base": `extra must be array of string.`,
      "string.empty": `extra cannot be an empty.`,
    }),
    categoryId: Joi.number().integer().positive().required().messages({
      "number.base": `Category id must be a type of number.`,
      "number.empty": `Category id cannot be an empty.`,
      "number.integer": `Category id must be positive integer.`,
      "number.positive": `Category id must be positive integer.`,
      "any.required": `Category id is required.`,
    }),
  });
  return joiSchema.validate(subCategory);
}

// *********** VALIDATE PRODUCT ***********
function validateProduct(product) {
  const joiSchema = Joi.object({
    name: Joi.string().trim().max(100).required().messages({
      "string.base": `SubCategory name must be a type of string.`,
      "string.empty": `SubCategory name cannot be an empty.`,
      "string.max": `SubCategory name must be less than or equal to {#limit} characters.`,
      "any.required": `SubCategory name is required.`,
    }),
    desc: Joi.string().trim().max(1024).messages({
      "string.base": `Description must be a type of string.`,
      "string.empty": `Description cannot be an empty.`,
      "string.max": `Description must be less than or equal to {#limit} characters.`,
    }),
    extras: Joi.array().items(Joi.string()).messages({
      "string.base": `extra must be array of string.`,
      "string.empty": `extra cannot be an empty.`,
    }),
    price: Joi.number().min(0).positive().required().messages({
      "number.base": `Price must be a type of number.`,
      "number.empty": `Price cannot be an empty.`,
      "number.min": `Price must be greater than or equal to {#limit}.`,
      "number.positive": `Price must be positive integer.`,
      "any.required": `Price is required.`,
    }),
    featured: Joi.boolean().messages({
      "boolean.base": `Featured must be a type of boolean.`,
    }),
    subCategoryId: Joi.number().integer().positive().required().messages({
      "number.base": `SubCategory id must be a type of number.`,
      "number.empty": `SubCategory id cannot be an empty.`,
      "number.integer": `SubCategory id must be positive integer.`,
      "number.positive": `SubCategory id must be positive integer.`,
      "any.required": `SubCategory id is required.`,
    }),
  });
  return joiSchema.validate(product);
}

// *********** VALIDATE DISCOUNT ***********
function validateDiscount(discount) {
  const joiSchema = Joi.object({
    name: Joi.string().trim().max(30).required().messages({
      "string.base": `Name must be a type of string.`,
      "string.empty": `Name cannot be an empty.`,
      "string.max": `Name must be less than or equal to {#limit} characters.`,
      "any.required": `Name is required.`,
    }),
    desc: Joi.string().trim().max(1024).messages({
      "string.base": `Description must be a type of string.`,
      "string.empty": `Description cannot be an empty.`,
      "string.max": `Description must be less than or equal to {#limit} characters.`,
    }),
    percentage: Joi.number()
      .integer()
      .positive()
      .min(1)
      .max(100)
      .required()
      .messages({
        "number.base": `Discount percentage must be a type of number.`,
        "number.empty": `Discount percentage cannot be an empty.`,
        "number.min": `Discount percentage must be greater than or equal to {#limit}.`,
        "number.max": `Discount percentage must be less than or equal to {#limit}.`,
        "any.required": `Discount percentage is required.`,
      }),
    months: Joi.number().min(1).positive().required().messages({
      "number.base": `Months must be a type of number.`,
      "number.empty": `Months cannot be an empty.`,
      "number.min": `Months must be greater than or equal to {#limit}.`,
      "number.positive": `Months must be positive integer.`,
      "any.required": `Months is required.`,
    }),
    productId: Joi.number().integer().positive().required().messages({
      "number.base": `Product id must be a type of number.`,
      "number.empty": `Product id cannot be an empty.`,
      "number.integer": `Product id must be positive integer.`,
      "number.positive": `Product id must be positive integer.`,
      "any.required": `Product id is required.`,
    }),
  });
  return joiSchema.validate(discount);
}

// *********** VALIDATE CART ITEMS ***********
function validateCartItems(cart) {
  const joiSchema = Joi.object({
    productId: Joi.number().integer().positive().required().messages({
      "number.base": `Product id must be a type of number.`,
      "number.empty": `Product id cannot be an empty.`,
      "number.integer": `Product id must be positive integer.`,
      "number.positive": `Product id must be positive integer.`,
      "any.required": `Product id is required.`,
    }),
    discountId: Joi.number().integer().positive().messages({
      "number.base": `Discount id must be a type of number.`,
      "number.empty": `Discount id cannot be an empty.`,
      "number.integer": `Discount id must be positive integer.`,
      "number.positive": `Discount id must be positive integer.`,
      "any.required": `Discount id is required.`,
    }),
  });
  return joiSchema.validate(cart);
}

// *********** UPDATE CART ITEMS ***********
function updateCartItems(cart) {
  const joiSchema = Joi.object({
    discountId: Joi.number().integer().positive().messages({
      "number.base": `Discount id must be a type of number.`,
      "number.empty": `Discount id cannot be an empty.`,
      "number.integer": `Discount id must be positive integer.`,
      "number.positive": `Discount id must be positive integer.`,
    }),
  });
  return joiSchema.validate(cart);
}

// *********** VALIDATE ORDER ***********
function validateOrder(order) {
  const joiSchema = Joi.object({
    promoId: Joi.number().integer().positive().messages({
      "number.base": `Promo id must be a type of number.`,
      "number.empty": `Promo id cannot be an empty.`,
      "number.integer": `Promo id must be positive integer.`,
      "number.positive": `Promo id must be positive integer.`,
    }),
  });
  return joiSchema.validate(order);
}

// *********** VALIDATE PAYMENT ***********
function validatePayment(payment) {
  const joiSchema = Joi.object({
    transactionId: Joi.string().max(30).required().messages({
      "string.base": `Transaction id must be a type of string.`,
      "string.empty": `Transaction id cannot be an empty.`,
      "string.max": `Transaction id must be less than or equal to {#limit} digits.`,
      "any.required": `Transaction id is required.`,
    }),
    razorpaySignature: Joi.string().max(100).required().messages({
      "string.base": `Razorpay signature must be a type of string.`,
      "string.empty": `Razorpay signature cannot be an empty.`,
      "string.max": `Razorpay signature must be less than or equal to {#limit} digits.`,
      "any.required": `Razorpay signature is required.`,
    }),
    razorpayOrderId: Joi.string().max(30).required().messages({
      "string.base": `Razorpay order id must be a type of string.`,
      "string.empty": `Razorpay order id cannot be an empty.`,
      "string.max": `Razorpay order id must be less than or equal to {#limit} digits.`,
      "any.required": `Razorpay order id is required.`,
    }),
    method: Joi.string().trim().required().messages({
      "string.base": `Payment method must be a type of string.`,
      "string.empty": `Payment method cannot be an empty.`,
      "string.max": `Payment method must be less than or equal to {#limit}.`,
      "any.required": `Payment method is required.`,
    }),
    amount: Joi.number().min(0).positive().required().messages({
      "number.base": `Amount must be a type of number.`,
      "number.empty": `Amount cannot be an empty.`,
      "number.min": `Amount must be less than or equal to {#limit}.`,
      "number.positive": `Amount must be positive integer.`,
      "any.required": `Amount is required.`,
    }),
    status: Joi.boolean().messages({
      "boolean.base": `Status must be a type of boolean.`,
    }),
    orderNo: Joi.string().max(10).required().messages({
      "string.base": `Order no must be a type of string.`,
      "string.empty": `Order no cannot be an empty.`,
      "string.max": `Order no must be less than or equal to {#limit}.`,
      "any.required": `Order no is required.`,
    }),
  });
  return joiSchema.validate(payment);
}

// *********** VALIDATE BILLING ***********
function validateBilling(billing) {
  const joiSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .max(20)
      .pattern(/^[a-z]+$/)
      .required()
      .messages({
        "string.base": `First name must be a type of string.`,
        "string.empty": `First name cannot be an empty.`,
        "string.max": `First name must be less than or equal to {#limit} characters.`,
        "string.pattern.base": `First name can only contain lowercase letters.`,
        "any.required": `First name is required.`,
      }),
    lastName: Joi.string()
      .trim()
      .max(20)
      .pattern(/^[a-z]+$/)
      .required()
      .messages({
        "string.base": `Last name must be a type of string.`,
        "string.empty": `Last name cannot be an empty.`,
        "string.max": `Last name must be less than or equal to {#limit} characters.`,
        "string.pattern.base": `Last name can only contain lowercase letters.`,
        "any.required": `Last name is required.`,
      }),
    mobilePhone: Joi.string().trim().pattern(phoneRegex).required().messages({
      "string.base": `Mobile phone must be a type of string.`,
      "string.empty": `Mobile phone cannot be an empty.`,
      "string.pattern.base": `Mobile phone must be valid.`,
      "any.required": `Mobile phone is required.`,
    }),
    country: Joi.string().trim().max(20).required().messages({
      "string.base": `Country must be a type of string.`,
      "string.empty": `Country cannot be an empty.`,
      "string.max": `Country must be less than or equal to {#limit} characters.`,
      "any.required": `Country is required.`,
    }),
    address1: Joi.string().max(100).trim().required().messages({
      "string.base": `Address1 must be a type of string.`,
      "string.empty": `Address1 cannot be an empty.`,
      "string.max": `Address1 must be less than or equal to {#limit} characters.`,
      "any.required": `Address1 is required.`,
    }),
    address2: Joi.string().max(100).trim().messages({
      "string.base": `Address2 must be a type of string.`,
      "string.empty": `Address2 cannot be an empty.`,
      "string.max": `Address2 must be less than or equal to {#limit} characters.`,
    }),
    postalCode: Joi.string()
      .trim()
      .pattern(postalCodeRegex)
      .required()
      .messages({
        "string.base": `Postal code must be a type of string.`,
        "string.empty": `Postal code cannot be an empty.`,
        "string.pattern.base": `Postal code must be valid.`,
        "any.required": `Postal code is required.`,
      }),
    city: Joi.string().max(30).trim().required().messages({
      "string.base": `City must be a type of string.`,
      "string.empty": `City cannot be an empty.`,
      "string.max": `City must be less than or equal to {#limit} characters.`,
      "any.required": `City is required.`,
    }),
    state: Joi.string().max(30).trim().required().messages({
      "string.base": `State must be a type of string.`,
      "string.empty": `State cannot be an empty.`,
      "string.max": `State must be less than or equal to {#limit} characters.`,
      "any.required": `State is required.`,
    }),
    organization: Joi.string().trim().max(60).messages({
      "string.base": `Organization must be a type of string.`,
      // "string.empty": `Organization cannot be an empty.`,
      "string.max": `Organization must be less than or equal to {#limit} characters.`,
    }),
    gstIn: Joi.string().trim().length(15).messages({
      "string.base": `Organization must be a type of string.`,
      // "string.empty": `Organization cannot be an empty.`,
      "string.length": `Organization length must be {#limit} characters.`,
    }),
    userId: Joi.number().integer().positive().required().messages({
      "number.base": `User id must be a type of number.`,
      "number.empty": `User id cannot be an empty.`,
      "number.integer": `User id must be positive integer.`,
      "number.positive": `User id must be positive integer.`,
      "any.required": `User id is required.`,
    }),
    // orderNo: Joi.string().max(10).required().messages({
    //   "string.base": `Order no must be a type of string.`,
    //   "string.empty": `Order no cannot be an empty.`,
    //   "string.max": `Order no must be less than or equal to {#limit} characters.`,
    //   "any.required": `Order no is required.`,
    // }),
  });
  return joiSchema.validate(billing);
}

module.exports = {
  validateRole,
  validateUser,
  validateUserLogin,
  validateUserProfile,
  validateDiscount,
  validatePromo,
  validateService,
  validateCategory,
  validateSubCategory,
  validateProduct,
  validateCartItems,
  validateOrder,
  validatePayment,
  validateBilling,
  updateCartItems,
};
