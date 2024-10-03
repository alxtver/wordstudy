import type { Nullable } from '@/types'
import moment from 'moment'
import type { Word } from '@/components/createwordcard/types'

export class Lesson {
  public id!: string;
  public name: Nullable<string> = 'Новый урок'
  public created: Date = new Date()
  public words: Word[] = [];

  public get displayDate(): string {
    return moment(this.created).format('YYYY-MM-DD HH:mm')
  }
}
