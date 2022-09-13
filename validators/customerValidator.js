const { body, param } = require("express-validator");

const customDateValidator = (date) => {
    const dateRegex = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
    return date.match(dateRegex);
};

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
    .withMessage("birthdate is required.")
    .custom((val) => customDateValidator(val))
    .withMessage(
        "birthdate provided should be of the following format: MM/DD/YYYY ([/ or . or -] can be the separators)"
    ),
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