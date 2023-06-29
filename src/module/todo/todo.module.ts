import { Module } from '@nestjs/common'
import { TodoController } from './todo.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from '../../entity/todo.entity'
import { TodoService } from './todo.service'

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule { }
