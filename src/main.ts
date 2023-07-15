import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { version } from '../package.json'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const config = new DocumentBuilder()
    .setTitle('Todo App')
    .setDescription('API description')
    .setVersion(version)
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)
  app.enableCors()
  app.useStaticAssets('./.file', { prefix: '/.file' })
  app.useStaticAssets('./web', { prefix: '/web' })
  await app.listen(3000)
}
bootstrap()
