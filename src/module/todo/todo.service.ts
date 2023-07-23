import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Todo } from '../../entity/todo.entity'
import { TodoCreateDto, TodoModifyDto } from './dto/todo.dto'

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepository: Repository<Todo>) { }

  async findAll(payload: {
    size?: number
    index?: number
    title?: string
    date?: string
    content?: string
    order?: string
    direction?: string
  }): Promise<Todo[]> {
    const option: any = {
      where: { title: payload.title, date: payload.date, content: payload.content }
    }
    if (!isNaN(payload.size) && !isNaN(payload.index)) {
      option.skip = (payload.index - 1) * payload.size
      option.take = payload.size
    }
    if (payload.order && payload.direction) {
      option.order = { [payload.order]: { direction: payload.direction } }
    }
    try {
      return await this.todoRepository.find(option)
    } catch {
      throw new BadRequestException()
    }
  }

  async findOneById(id: number): Promise<Todo> {
    const result = await this.todoRepository.findOneBy({ id })
    if (result === null) {
      throw new NotFoundException()
    }
    return result
  }

  async createOne(todoCreateDto: TodoCreateDto): Promise<Todo> {
    const entity = this.todoRepository.create({
      title: todoCreateDto.title,
      date: todoCreateDto.date,
      content: todoCreateDto.content
    })
    await this.todoRepository.insert(entity)
    return entity
  }

  async modifyOneById(id: number, todoModifyDto: TodoModifyDto) {
    if (await this.findOneById(id)) {
      await this.todoRepository.update({ id }, todoModifyDto)
      return await this.findOneById(id)
    }
    throw new NotFoundException()
  }

  async deleteOneById(id: number): Promise<Todo> {
    const entity = await this.findOneById(id)
    if (entity) {
      await this.todoRepository.delete({ id })
      return entity
    }
    throw new NotFoundException()
  }
}
