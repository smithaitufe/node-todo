import supertest from 'supertest'

let request;

const initializeRequest = () => {
    request = supertest("http://localhost:3000")
}
beforeEach(() => {
    initializeRequest()
})
describe("todos", () => {
    it("Get all todos", (done) => {
        request.post("/graphql")
        .send({ query: '{ todos { id description completed } }'})
        .expect(200)
        .end((err, res) => {
            expect(res.body.data.todos).not.toBeNull()
            expect(res.body.data.todos.length).toBeGreaterThan(0)
            done()
        })
    })
})