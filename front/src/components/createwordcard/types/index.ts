import type { Lesson } from '@/views/editlesson/types'

export class Word {
  public id!: string
  public created!: Date
  public enText!: string
  public ruText!: string
  public lesson!: Lesson
}
