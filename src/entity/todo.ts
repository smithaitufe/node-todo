import { PrimaryGeneratedColumn, Column, Entity, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";

@Entity({ name: "todos" })
@ObjectType()
export class Todo {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;
    @Field()
    @Column()
    description: string;
    @Field()
    @Column({ default: false })
    completed: boolean;
    @Field()
    @CreateDateColumn({ name: "created_at"})
    createdAt: Date;
    @Field()
    @UpdateDateColumn({ name: "updated_at"})
    updatedAt: Date;
    @Field({ nullable: true })
    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deletedAt?: Date;
}