const request = require("supertest");
const app = require("../src/main.js");
const database = require("../src/database.js")

beforeAll(async () => {
    await database.migrate.latest().then(() => {
        return database.seed.run();
    });
});

afterAll(async () => {
    await database.migrate.rollback();
});

describe("API", () => {
    describe("POST /notes", ()  => {
        it("rejects invalid request bodies", async () => {
            var response = await request(app).post("/notes").send({})
            expect(response.status).toBe(400);

            response = await request(app).post("/notes").send({
                note: 0
            })
            expect(response.status).toBe(400);

            response = await request(app).post("/notes").send({
                note: "g"
            })
            expect(response.status).toBe(400);
        })
    })

    describe("GET /notes/:guid", () => {
        it("returns an error if the note does not exist", async () => {
            var response = await request(app).get("/notes/1")
            expect(response.status).toBe(410)
        })
        it("returns a successful note", async () => {
            var response = await request(app).get("/notes/bdc048c0-551d-11eb-8291-7733037ea32b")
            expect(response.status).toBe(200)
        })
    })

    describe("DELETE /notes/:guid", () => {
        it("rejects invalid request bodies", async () => {
            var response = await request(app).delete("/notes/1").send({})
            expect(response.status).toBe(400);

            response = await request(app).delete("/notes/bdc048c0-551d-11eb-8291-7733037ea32b").send({})
            expect(response.status).toBe(400);

            response = await request(app).delete("/notes/bdc048c0-551d-11eb-8291-7733037ea32b")
                .send({
                    hash: 123
                })
            expect(response.status).toBe(400);
        })
    })
})
