import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { LessonEntity } from '../../lesson/entities/lesson.entity'

@Entity()
export class Word {
    @PrimaryGeneratedColumn('uuid')
    id?: string

    @CreateDateColumn()
    created: Date

    @Column()
    enText: string

    @Column()
    ruText: string

    @ManyToOne(() => LessonEntity, (lesson) => lesson.words, { onDelete: 'CASCADE' })
    lesson: LessonEntity
}
