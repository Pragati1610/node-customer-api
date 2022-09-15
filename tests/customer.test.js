const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;

const { describe, it } = require("mocha");

const {
    validCreateCustomerData,
    invalidCreateCustomerData,
    validUpdateCustomerData,
    invalidUpdateCustomerData,
} = require("./testData");

const app = require("../app");
const http = require("http");
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
let id = "";

describe("Customer CRUD", () => {
    before((done) => {
        server.listen(PORT, done);
    });

    describe("Create customer", () => {
        it("should create customer asynchronously", async() => {
            const res = await chai
                .request(`${process.env.TESTING_URL}`)
                .post("/customer")
                .send(validCreateCustomerData);
            expect(res).to.have.status(200);
        }).timeout(10000);
        it("shouldn't create when invalid customer details are given", async() => {
            const res = await chai
                .request(`${process.env.TESTING_URL}`)
                .post("/customer")
                .send(invalidCreateCustomerData);
            expect(res).to.have.status(400);
        }).timeout(10000);
    });

    describe("Get customer(s)", () => {
        it("should get all customers in an array", async() => {
            const res = await chai
                .request(`${process.env.TESTING_URL}`)
                .get("/customer");
            expect(res.body).to.be.a("array");
            expect(res).to.have.status(200);
            id = res.body[0].customerId;
        }).timeout(10000);
        it("should get the customer details based on customerId", async() => {
            const res = await chai
                .request(`${process.env.TESTING_URL}`)
                .get(`/customer/${id}`);

            expect(res.body).to.be.a("object");
            expect(res).to.have.status(200);
        }).timeout(10000);
    });

    describe("Update a customer", () => {
        it("should update details of a customer", async() => {
            const res = await chai
                .request(`${process.env.TESTING_URL}`)
                .put(`/customer/${id}`)
                .send(validUpdateCustomerData);

            expect(res.body).to.be.a("array");
            expect(res.body[0]).to.equal(1);
            expect(res).to.have.status(200);
        }).timeout(10000);

        it("should not update details of the customer as incorrect info is provided", async() => {
            const res = await chai
                .request(`${process.env.TESTING_URL}`)
                .put(`/customer/${id}`)
                .send(invalidUpdateCustomerData);

            expect(res.body).to.be.a("object");
            expect(res.body.status).to.equal("fail");
            expect(res).to.have.status(400);
        }).timeout(10000);
    });

    describe("Delete a customer", () => {
        it("should delete a customer based on customerId", async() => {
            const res = await chai
                .request(`${process.env.TESTING_URL}`)
                .delete(`/customer/${id}`);

            expect(res).to.have.status(200);
        }).timeout(10000);
    });
    after((done) => {
        server.close(done);
    });
});