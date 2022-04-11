
const request = require('supertest');
const path = require('path');
const app = require('../../app');


describe("POST /cdi", () => {
    const csvTest = path.resolve(__dirname, './mock.csv');
    describe('Testando o envio de arquivo CSV', () => {
        test("Deve retornar o statusCode 201", async () => {
            const response = await request(app).post("/cdi")
                .attach('fileCSV', csvTest)
            expect(response.statusCode).toBe(201)
        })
    })
})

describe("GET /cdi", () => {
    describe('Testando a rota de listar as Taxas de CDI armazenadas no Banco de dados', () => {
        test("Deve retornar o statusCode 200", async () => {
            const response = await request(app).get("/cdi")
            expect(response.statusCode).toBe(200)
        })
    })
})

describe("POST /cdb", () => {
    describe('Testando a rota de cadastro da consulta do CDB', () => {
        test("Deve retornar o statusCode 200", async () => {
            const response = await request(app).post("/cdb").send({
                "investmentDate": "2019-12-02",
                "cdbRate": 103.5,
                "currentDate": "2019-12-05"
            })
            expect(response.statusCode).toBe(200)
        })
        test("Deve retornar o statusCode 200", async () => {
            const response = await request(app).post("/cdb").send({
                "investmentDate": "2022-12-02",
                "cdbRate": 103.5,
                "currentDate": "2022-12-05"
            })
            expect(response.statusCode).toBe(200)
        })
        test("Deve retornar o statusCode 406", async () => {
            const response = await request(app).post("/cdb").send({
                "investmentDate": "2016-11-14",
                "cdbRate": 103.5,
            })
            expect(response.statusCode).toBe(406)
        })
        test("Deve retornar o statusCode 406", async () => {
            const response = await request(app).post("/cdb").send({
                "investmentDate": "2016-11-14",
            })
            expect(response.statusCode).toBe(406)
        })
        test("Deve retornar o statusCode 406", async () => {
            const response = await request(app).post("/cdb").send({
            })
            expect(response.statusCode).toBe(406)
        })
    })
})

describe("GET /cdb/:id", () => {
    describe('Testando a rota da consulta do CDB', () => {
        test("Deve retornar o statusCode 200", async () => {
            const response = await request(app).get("/cdb/1")
            expect(response.statusCode).toBe(200)
        })
        test("Deve retornar o statusCode 500", async () => {
            const response = await request(app).get("/cdb/2")
            expect(response.statusCode).toBe(200)
        })
        test("Deve retornar o statusCode 500", async () => {
            const response = await request(app).get("/cdb/3")
            expect(response.statusCode).toBe(404)
        })
    })

})

