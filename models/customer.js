const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const schema = {
    customerId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
};

const options = {
    timestamps: false,
};

const Customer = sequelize.define("Customer", schema, options);

module.exports = Customer;