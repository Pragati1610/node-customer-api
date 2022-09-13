const { Customer } = require("../models/relations");
const logger = require("../logging/logger");
const { QueryTypes, Sequelize } = require("sequelize");

class CustomerController {
    static async createCustomer(customer) {
        try {
            const createdCustomer = await Customer.create(customer);
            return {
                message: "customer created",
                createdCustomer,
            };
        } catch (e) {
            logger.error(e);
            return {
                isError: true,
                message: e.toString(),
            };
        }
    }

    static async getAllCustomers() {
        try {
            let customers = await Customer.findAll({ raw: true });
            return customers;
        } catch (e) {
            logger.error(e);
            return {
                isError: true,
                message: e.toString(),
            };
        }
    }

    static async getCustomer(customerId) {
        try {
            const customer = await Customer.findByPk(customerId);
            if (!customer) {
                return {
                    isError: true,
                    message: "No such customer present",
                };
            }
            return customer;
        } catch (e) {
            logger.error(e);
            return {
                isError: true,
                message: e.toString(),
            };
        }
    }

    static async updateCustomer(customer, customerId) {
        try {
            const updatedCustomer = await Customer.update(customer, {
                where: { customerId: customerId },
            });
            return updatedCustomer;
        } catch (e) {
            logger.error(e);
            return {
                isError: true,
                message: e.toString(),
            };
        }
    }

    static async deleteCustomer(customerId) {
        try {
            await Customer.destroy({ where: { customerId } });
            return { message: "deleted customer" };
        } catch (e) {
            logger.error(e);
            return {
                isError: true,
                message: e.toString(),
            };
        }
    }
}

module.exports = CustomerController;