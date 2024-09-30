import { Injectable } from '@nestjs/common'
import { LessonEntity } from './entities/lesson.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult'

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(LessonEntity)
        private lessonRepository: Repository<LessonEntity>
    ) {}

    /**
     * Получить все уроки
     */
    async getAll(): Promise<Array<LessonEntity>> {
        return await this.lessonRepository.find()
    }
    /** Создать урок */
    async create(lesson: LessonEntity): Promise<LessonEntity> {
        delete lesson.id
        return await this.lessonRepository.save(lesson)
    }
    /** Удалить урок */
    async delete(id: string): Promise<any> {
        const item = await this.lessonRepository.findOneBy({ id })
        if (item) {
            return await this.lessonRepository.remove(item)
        }
        return
    }
}
