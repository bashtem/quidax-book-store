import app from '../src/app'
import * as request from 'supertest'
import { createConnection, getConnection } from 'typeorm';

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJmaXJzdHVzZXJuYW1lIiwicGFzc3dvcmQiOiIkMmIkMTAkQ21VSFRGTEQ5dGVXakFCVE1ENHU0T1VDeXhaYmZZQTAzb1gwRzZEUmJuN3ZIRlpPR2suQ20iLCJjcmVhdGVkQXQiOiIyMDIyLTAyLTE0VDAwOjA4OjAyLjAxNFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTAyLTE0VDAwOjA4OjAyLjAxNFoiLCJpYXQiOjE2NDQ4ODg2MDV9.BQpwaS1CgjBTSNL-a_AVwwTwXL-rJ52WHABRyk0MZPU'

beforeAll( async () => {
    await createConnection()
})

afterAll( async () => {
    await getConnection().close()
})

describe("All endpoint tests related to Book", () => {

    describe("Fetch 20 records of featured books", () => {

        it("Should return status code 200", async () => {

            const res = await request(app)
            .get('/api/v1/books/featured')
            .set('Authorization', token)

            expect(res.statusCode).toEqual(200);
        })

        it("Should returns 20 records", async() => {

            const res = await request(app)
            .get('/api/v1/books/featured')
            .set('Authorization', token)

            expect(res.body.data).toHaveLength(20);
        })
    })

    describe("Fetch all books records with with 15 records per page", () => {

        it("Should return status code 200", async () => {

            const res = await request(app)
            .get('/api/v1/books')
            .set('Authorization', token)

            expect(res.statusCode).toEqual(200);
        })

        it("Should returns 20 records", async() => {

            const res = await request(app)
            .get('/api/v1/books')
            .set('Authorization', token)

            expect(res.body.data.records).toHaveLength(15);
        })

    })

    describe("Get a record for specific book detail", () => {

        it("Should return status code 404", async () => {

            const res = await request(app)
            .get('/api/v1/books/jh876hvhv')
            .set('Authorization', token)

            expect(res.statusCode).toEqual(404);
        })

    })

    describe("Rate and return average rating for a specific book", () => {

        it("Should return status code 404", async () => {

             const res = await request(app)
            .put('/api/v1/books/rating')
            .set('Authorization', token)
            .send({bookId: "bbmnbj", rating: 6})

            expect(res.statusCode).toEqual(400);
        })
    })

    describe("Add or Remove like for a specific Book with like count updated", () => {

        it("Should return status code 404", async () => {

             const res = await request(app)
            .put('/api/v1/books/likes')
            .set('Authorization', token)
            .send({bookId: "bbmnbj"})

            expect(res.statusCode).toEqual(404);
        })
    })

    describe("Search for a Book with title, author, genre or tags with max of 10 records per search result", () => {

        it("Should return status code 200", async () => {

            const res = await request(app)
            .get('/api/v1/books/search?q=the')
            .set('Authorization', token)

            expect(res.statusCode).toEqual(200);
        })

        it("Should return max of 10 records", async() => {

            const res = await request(app)
            .get('/api/v1/books/search?q=the')
            .set('Authorization', token)

            expect(res.body.data.records.length).toBeLessThan(11)
        })
    })
})