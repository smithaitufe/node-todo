import Express from 'express'
import { Container } from "typedi"
import { ApolloServer } from 'apollo-server-express'
import * as TypeOrm from 'typeorm'
import * as TypeGraphQL from 'type-graphql'
import { TodoResolver } from "./graphql/resolver/todo"

async function main(): Promise<void> {
    
    TypeOrm.useContainer(Container)
    await TypeOrm.createConnection()
    
    const schema = await TypeGraphQL.buildSchema({
        resolvers: [
          TodoResolver,
        ],
        container: Container,
        validate: false,
    }) 

    const server = new ApolloServer({
        schema
    })

    const app = Express()    
    server.applyMiddleware({ app, path: "/graphql" })    
    app.listen({ port: 3000 })   

}

main()