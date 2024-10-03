import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm'
import { Word } from '../../words/entities/word.entity'

@Entity()
export class LessonEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @CreateDateColumn()
    created: Date

    @Column()
    name: string

    @OneToMany(() => Word, (word) => word.lesson)
    words: Word[]
}
