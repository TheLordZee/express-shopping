process.env.NODE_ENV="test";

const request = require('supertest');
const app = require('./app');
let items = require("./fakeDb")

let item = {name: "cheese",  price: 1.65}

beforeEach(()=>{
    items.push(item)
})

afterEach(() => {
    items.length = 0;
})

describe("GET /items", () => {
    test('GET all items', async() => {
        const res = await request(app).get("/items")
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([item])
    })
})

describe('GET /items/:name', () => {
    test('GETting  a item by name', async () => {
        const res = await request(app).get(`/items/${item.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(item)
    })
    test('404 for invalid item name', async () => {
        const res = await request(app).get(`/items/oranges`)
        expect(res.statusCode).toBe(404)
    })
})

describe('POST /items', () => {
    test('creating a item', async () => {
        const res = await request(app)
            .post('/items')
            .send({
                name: 'milk',
                price: 5.75
            })
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({
            added: {
                    name: 'milk',  
                    price: 5.75 
                }
        })
    })
})

describe("PATCH /items/:name", () => {
    test('Updating a item', async () => {
        const res = await request(app)
            .patch(`/items/${item.name}`)
            .send({
                name: 'mozzerella',
                price: 3.50
            })
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({
            updated:{
                name: "mozzerella",
                price: 3.50,
            }
        })
    })
    test('404 for invalid item name', async () => {
         const res = await request(app)
            .patch(`/items/oranges`)
            .send({qty: 35, price: 2.00})
        expect(res.statusCode).toBe(404)
    })
})

describe('DELETE /items/:name', () => {
    test('deleting a item', async () => {
        const res = await request(app).delete(`/items/${item.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({message: "successfully deleted"})
    })
    test('404 for invalid item name', async () => {
         const res = await request(app).delete(`/items/oranges`)
        expect(res.statusCode).toBe(404)
    })
})