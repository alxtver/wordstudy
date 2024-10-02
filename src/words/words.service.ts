import { Injectable } from '@nestjs/common'
import { Word } from './entities/word.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class WordsService {
    constructor(
        @InjectRepository(Word)
        private wordsRepository: Repository<Word>
    ) {}

    async getByLesson(lessonId: string): Promise<Word[]> {
        return await this.wordsRepository.find({
            relations: ['lesson'],
            where: { id: lessonId },
            order: {
                created: 'desc'
            }
        })
    }

    async create(word: Word): Promise<Word> {
        delete word.id
        return await this.wordsRepository.save(word)
    }

    async update(word: Word) {
        return await this.wordsRepository.save(word)
    }

    async delete(id: string) {
        const item = await this.wordsRepository.findOneBy({ id })
        if (item) {
            return await this.wordsRepository.remove(item)
        }
        return
    }
}
