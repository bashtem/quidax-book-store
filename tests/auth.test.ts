import app from '../src/app'
import * as request from 'supertest'
import { createConnection, getConnection } from 'typeorm';

beforeAll( async () => {
    await createConnection()
})

afterAll( async () => {
    await getConnection().close()
})

describe("User Authentication test", () => {

    it("Should return status code 200 if authentication is successful", async () => {

        const res = await request(app)
        .post("/api/v1/auth/login")
        .send({username: "firstusername", password: "Quid@xr00t"})

        expect(res.statusCode).toEqual(200);
    })
})