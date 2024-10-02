import type { Nullable } from '@/types'
import moment from 'moment'

export class Lesson {
  public id!: string;
  public name: Nullable<string> = 'Новый урок'
  public created: Date = new Date()

  public get displayDate(): string {
    return moment(this.created).format('YYYY-MM-DD HH:mm')
  }
}
