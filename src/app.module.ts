import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './module/auth/auth.module'
import { TodoModule } from './module/todo/todo.module'
import { Todo } from './entity/todo.entity'
import { Auth } from './entity/auth.entity'
import { AuthGuard } from './module/auth/auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { FileModule } from './module/file/file.module'
import { WsModule } from './module/ws/ws.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './.database/todo_app.db',
      entities: [Auth, Todo]
    }),
    AuthModule,
    TodoModule,
    FileModule,
    WsModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard }
  ]
})
export class AppModule { }
