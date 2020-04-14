import "reflect-metadata";
import Express from 'express'
import { ApolloServer } from 'apollo-server-express'
import * as TypeGraphQL from 'type-graphql'
import { TodoResolver } from "./graphql/resolver/todo"
import { Server } from 'http'
import * as typeorm from 'typeorm'
import * as typedi from 'typedi'

typeorm.useContainer(typedi.Container)
async function start(): Promise<Server> {
    const schema = await TypeGraphQL.buildSchema({
        resolvers: [
            TodoResolver,
        ],
        container: typedi.Container,
        validate: false,
    })

    const server = new ApolloServer({
        schema,
    })

    let app = Express()
    server.applyMiddleware({ app, path: "/graphql" })
    return app.listen({ port: 3000 })
}

function stop(app: Server){
    app.close()
}

interface ServerType {
    start: () => Promise<Server>;
    stop: (app: Server) => void
}

const server = async (): Promise<ServerType> => {
    if(!typeorm.getConnectionManager().has("default")){
        await typeorm.createConnection()
    }
    return Promise.resolve({
        start,
        stop
    })
}
export default server