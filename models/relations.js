const Customer = require("./customer");

if (process.env.SYNC) {
    Customer.sync({
        alter: true,
    });
}

module.exports = {
    Customer,
};