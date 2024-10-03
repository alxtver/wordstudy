import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { WordsService } from './words.service'
import { Word } from './entities/word.entity'

@Controller('words')
export class WordsController {
    constructor(private readonly wordsService: WordsService) {}

    @Get('getByLesson')
    async getByLesson(@Query('lessonId') lessonId: string): Promise<Word[]> {
        return await this.wordsService.getByLesson(lessonId)
    }

    @Post('create')
    async create(@Body() createWordDto: Word): Promise<Word> {
        return await this.wordsService.create(createWordDto)
    }

    @Put('update')
    async update(@Body() word: Word): Promise<Word> {
        return this.wordsService.update(word)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: string) {
        return this.wordsService.delete(id)
    }
}
