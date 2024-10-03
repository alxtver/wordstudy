import RequestUrl from '@/api/RequestUrl'
import { AbstractApi } from '@/api/AbstractApi'
import { Word } from '@/components/createwordcard/types'
import { dataToArrayClass, dataToClass } from '@/api/ClassFactory'

@RequestUrl('words')
class WordApi extends AbstractApi {

  public async getByLesson(lessonId: string): Promise<Word[]> {
    const json = (await this.get('/getByLesson', {
      searchParams: { lessonId }
    }).json()) as unknown[]
    return dataToArrayClass(Word, json)
  }

  public async create(word: Word): Promise<Word> {
    const json = await this.post('/create', {json: word}).json()
    return dataToClass(Word, json)
  }

  public async update(word: Word): Promise<Word> {
    const json = await this.put('/create', {json: word}).json()
    return dataToClass(Word, json)
  }

  public async removeWord(id: string): Promise<void> {
    await this.delete('/delete/' + id)
  }
}

export default new WordApi()
