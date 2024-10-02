import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { config } from './config/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as process from 'process'
import { WebsocketGateway } from './websocket/websocket.gateway'
import { WebsocketModule } from './websocket/websocket.module'
import { LessonModule } from './lesson/lesson.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { WordsModule } from './words/words.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config]
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: 3306,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: 'wordstudy',
            autoLoadEntities: true,
            synchronize: true
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'static'),
            exclude: ['/api/(.*)']
        }),
        LessonModule,
        WebsocketModule,
        WordsModule
    ],
    controllers: [AppController],
    providers: [AppService, WebsocketGateway]
})
export class AppModule {}
