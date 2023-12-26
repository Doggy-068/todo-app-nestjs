import { NestFactory } from '@nestjs/core'
import { AppModule } from './module/app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { version } from '../../../package.json'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  const config = new DocumentBuilder()
    .setTitle('Todo-App-Nestjs')
    .setDescription('The api for todo-app-tauri.')
    .setVersion(version)
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)
  await app.listen(3000)
}
bootstrap()
