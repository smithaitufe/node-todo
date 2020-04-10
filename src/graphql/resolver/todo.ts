import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Todo } from '../../entity/todo'
import { Repository } from "typeorm";
import { TodoInput } from "../types/todo";

@Resolver(of => Todo)
export class TodoResolver {
    constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>){}

    @Query(type => [Todo])
    todos(): Promise<Todo[]> {
        return this.todoRepository.find({
            order: { createdAt: "ASC" },
        })
    }
    
    @Mutation(returns => Todo)
    async createTodo(@Arg("input") input: TodoInput): Promise<Todo> {
        let todo = this.todoRepository.create({ ...input })        
        return await this.todoRepository.save(todo)
    }

    @Mutation(returns => Todo)
    async editTodo(@Arg("id", { nullable: false }) id: number, @Arg("input") input: TodoInput): Promise<Todo> {
        let todo = await this.todoRepository.findOne(id)
        if(!todo){
            throw new Error("invalid todo id")
        }

        todo = { ...todo, ...input }
        return await this.todoRepository.save(todo)
    }

    @Mutation(returns => Todo)
    async deleteTodo(@Arg("id", { nullable: false }) id: number): Promise<Todo> {
        let todo = await this.todoRepository.findOne(id)
        if(!todo){
            throw new Error("invalid todo id")
        }
        await this.todoRepository.softDelete(id)
        return (await this.todoRepository.findOne(id))!
        
    }
}