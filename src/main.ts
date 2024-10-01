import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { headersMiddleware } from './middleware/headers.middleware'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors({
        origin: '*'
    })

    app.setGlobalPrefix('api')

    app.use(headersMiddleware)

    await app.listen(3000)

    console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
