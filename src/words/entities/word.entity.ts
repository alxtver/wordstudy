import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
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

  @OneToOne(() => LessonEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  lesson: LessonEntity
}
