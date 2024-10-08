import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { LessonService } from './lesson.service'
import { LessonEntity } from './entities/lesson.entity'

@Controller('lessons')
export class LessonController {
    constructor(private readonly lessonService: LessonService) {}

    /**
     * Получить список всех уроков
     */
    @Get('getAll')
    async getAll(): Promise<Array<LessonEntity>> {
        return await this.lessonService.getAll()
    }

    @Get('getById')
    async getById(@Query('id') id: string): Promise<LessonEntity | null> {
        return await this.lessonService.getById(id)
    }

    @Post('create')
    async create(@Body() lesson: LessonEntity): Promise<LessonEntity> {
        return await this.lessonService.create(lesson)
    }

    @Put('update')
    async update(@Body() lesson: LessonEntity): Promise<LessonEntity> {
        return await this.lessonService.update(lesson)
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string): Promise<any> {
        return await this.lessonService.delete(id)
    }
}
