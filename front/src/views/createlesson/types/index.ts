import type { Nullable } from '@/types'

export class Lesson {
  public id!: string;
  public name: Nullable<string> = 'Новый урок'
  public created: Date = new Date()
}
