import { InputType, Field } from "type-graphql";

@InputType()
export class TodoInput {
    @Field()
    description: string;
    @Field({ nullable: true })
    completed?: boolean;
}