import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common'
import { LessonService } from './lesson.service'
import { LessonEntity } from './entities/lesson.entity'
import { Response } from 'express'

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

    @Post('create')
    async create(@Body() lesson: LessonEntity): Promise<LessonEntity> {
        return await this.lessonService.create(lesson)
    }

    @Delete('delete/:id')
    async delete(@Res() res: Response, @Param() id: string): Promise<any> {
        return await this.lessonService.delete(id)
        // return `This action removes a #${id} cat`
    }
}
