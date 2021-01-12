const request = require("supertest")
const app = require("../src/main")

beforeAll(() => {
    require("dotenv").config(); 
})
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
})