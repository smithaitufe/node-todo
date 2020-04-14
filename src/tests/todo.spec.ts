import supertest from 'supertest'
import httpServer from '../server'
import { Server } from 'http';

let request;
let app: Server;
let server: any; 
beforeAll(async () => {
    server = await httpServer()
    app = await server.start()
    request = supertest(app)
})
afterAll(async (done) => {
    await server.stop(app)        
    done()
})
describe("resolver", () => {
    it("Create a todo", done => {
        request
        .post("/graphql")
        .set('Accept', 'application/json')
        .send({ query: `
            mutation createTodo { 
                createTodo(input: { description: "Build api" }) 
                { 
                    id 
                    description 
                } 
            }
        `})
        .expect(200)
        .end((err, res) => {  
            expect(res.body.data.createTodo).not.toBeNull()
            done()
        })
    })

    it("Get all todos", (done) => {
        request
        .post("/graphql")
        .send({ query: ` 
            query todos {
                todos { 
                    id 
                    description 
                    completed 
                } 
            }
        `})
        .expect(200)
        .end((err, res) => {
            expect(res.body.data.todos).not.toBeNull()
            expect(res.body.data.todos.length).toBeGreaterThan(0)
            done()
        })
    })
})