import { PrimaryGeneratedColumn, Column, Entity, DeleteDateColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity({ name: "todos" })
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    description: string;
    @Column()
    completed: boolean;
    deleted: boolean;
    @CreateDateColumn({ name: "created_at"})
    createdAt: Date;
    @UpdateDateColumn({ name: "updated_at"})
    updatedAt: Date;
    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deletedAt: Date;
}