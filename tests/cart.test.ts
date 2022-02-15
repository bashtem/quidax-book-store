import app from '../src/app'
import * as request from 'supertest'
import { createConnection, getConnection } from 'typeorm'

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJmaXJzdHVzZXJuYW1lIiwicGFzc3dvcmQiOiIkMmIkMTAkQ21VSFRGTEQ5dGVXakFCVE1ENHU0T1VDeXhaYmZZQTAzb1gwRzZEUmJuN3ZIRlpPR2suQ20iLCJjcmVhdGVkQXQiOiIyMDIyLTAyLTE0VDAwOjA4OjAyLjAxNFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTAyLTE0VDAwOjA4OjAyLjAxNFoiLCJpYXQiOjE2NDQ4ODg2MDV9.BQpwaS1CgjBTSNL-a_AVwwTwXL-rJ52WHABRyk0MZPU'

beforeAll( async () => {
    await createConnection()
})

afterAll( async () => {
    await getConnection().close()
})

describe("All endpoint tests related to Cart ", () => {

    describe("Show Items in Cart with Subtotal pre-calculated from backend", () => {

        it("Should return status code 200 with subtotal", async () => {

             const res = await request(app)
            .get('/api/v1/carts')
            .set('Authorization', token)

            expect(res.statusCode).toEqual(200);
        })
        
        it("Should return subtotal greater than or equals to zero", async () => {

             const res = await request(app)
            .get('/api/v1/carts')
            .set('Authorization', token)

            expect(res.body.data.subTotal).toBeGreaterThanOrEqual(0)
        })
    })

    describe("Add or Update Items i.e Book to Cart", () => {

        it("Should return status code 404", async () => {

             const res = await request(app)
            .put('/api/v1/carts')
            .set('Authorization', token)
            .send({bookId: "bbmnbj", quantity: 5})

            expect(res.statusCode).toEqual(404);
        })
    })
})