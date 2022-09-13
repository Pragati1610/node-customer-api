const { body, param } = require("express-validator");

const customerCreateValidator = [
    body("name")
    .exists({ checkFalsy: true })
    .withMessage("name is required.")
    .isString()
    .withMessage("name must be string."),
    body("surname")
    .exists({ checkFalsy: true })
    .withMessage("surname is required.")
    .isString()
    .withMessage("surname must be string."),
    body("email")
    .exists({ checkFalsy: true })
    .withMessage("email is required.")
    .isString()
    .withMessage("email must be string."),
    body("birthdate")
    .exists({ checkFalsy: true })
    .withMessage("birthdate is required."),
    // .trim()
    // .isDate()
    // .withMessage("birthdate must be a valid date."),
];

const customerUpdateValidator = [
    ...customerCreateValidator,
    param("customerId")
    .exists({ checkFalsy: true })
    .withMessage("customerId is required.")
    .isUUID(4)
    .withMessage("customerId must be a valid UUID."),
];

module.exports = { customerCreateValidator, customerUpdateValidator };