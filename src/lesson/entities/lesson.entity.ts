import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity()
export class LessonEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @CreateDateColumn()
    created: Date

    @Column()
    name: string
}
