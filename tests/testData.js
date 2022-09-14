// Test data [request bodies]

const validCreateCustomerData = {
    name: "John",
    surname: "Doe",
    email: "john@doe.com",
    birthdate: "03.08.1234",
};

const invalidCreateCustomerData = {
    name: "John",
    surname: "Doe",
    email: "john@doe.com",
    birthdate: "3.08.1234",
};

const validUpdateCustomerData = {
    name: "Jane",
    surname: "Doe",
    email: "jane@doe.com",
    birthdate: "03.08.1234",
};

const invalidUpdateCustomerData = {
    name: "John",
    surname: "Doe",
    email: "john@doe.com",
    birthdate: "3.08.1234",
};

module.exports = {
    validCreateCustomerData,
    invalidCreateCustomerData,
    validUpdateCustomerData,
    invalidUpdateCustomerData,
};