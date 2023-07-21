import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './module/auth/auth.module'
import { TodoModule } from './module/todo/todo.module'
import { Todo } from './entity/todo.entity'
import { Auth } from './entity/auth.entity'
import { Press } from './entity/press.entity'
import { Book } from './entity/book.entity'
import { AuthGuard } from './module/auth/auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { FileModule } from './module/file/file.module'
import { WsModule } from './module/ws/ws.module'
import { GraphqlModule } from './module/graphql/graphql.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './.database/todo_app.db',
      entities: [Auth, Todo, Press, Book]
    }),
    AuthModule,
    TodoModule,
    FileModule,
    WsModule,
    GraphqlModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard }
  ]
})
export class AppModule { }
