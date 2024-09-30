import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { headersMiddleware } from './middleware/headers.middleware'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors({
        origin: '*'
    })

    app.use(headersMiddleware)

    await app.listen(3000)
}
bootstrap()
