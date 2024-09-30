import RequestUrl from '../../../api/RequestUrl'
import { AbstractApi } from '@/api/AbstractApi'
import { Lesson } from '@/views/createlesson/types'
import { dataToArrayClass, dataToClass } from '@/api/ClassFactory'

@RequestUrl('lessons')
class LessonApi extends AbstractApi {
  public async getAll(): Promise<Lesson[]> {
    const json = await this.get('/getAll').json() as unknown []
    return dataToArrayClass(Lesson, json)
  }

  public async create(lesson: Lesson): Promise<Lesson> {
    const json = await this.post('/create', { json: lesson }).json() as unknown
    return dataToClass(Lesson, json)
  }

  public async removeLesson(id: string): Promise<void> {
    await this.delete(`/delete/${id}`)
  }
}

export default new LessonApi()
