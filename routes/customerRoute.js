const customerController = require("../controllers/customerController");
const {
    customerCreateValidator,
    customerUpdateValidator,
} = require("../validators/customerValidator");
const validate = require("../middleware/validate.js");

const express = require("express");
const router = express.Router();

router.post("/", validate(customerCreateValidator), async(req, res) => {
    const response = await customerController.createCustomer(req.body);
    return res.status(response.isError ? 400 : 200).send(response);
});

router.get("/", async(req, res) => {
    const response = await customerController.getAllCustomers();
    return res.status(response.isError ? 400 : 200).send(response);
});

router.get("/:customerId", async(req, res) => {
    const response = await customerController.getCustomer(req.params.customerId);
    return res.status(response.isError ? 400 : 200).send(response);
});

router.put(
    "/:customerId",
    validate(customerUpdateValidator),
    async(req, res) => {
        const response = await customerController.updateCustomer(
            req.body,
            req.params.customerId
        );
        return res.status(response.isError ? 400 : 200).send(response);
    }
);

router.delete("/:customerId", async(req, res) => {
    const response = await customerController.deleteCustomer(
        req.params.customerId
    );
    return res.status(response.isError ? 400 : 200).send(response);
});

module.exports = router;