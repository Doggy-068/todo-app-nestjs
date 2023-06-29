import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Sse, MessageEvent } from '@nestjs/common'
import { TodoService } from './todo.service'
import { TodoReturnDto, TodoCreateDto, TodoModifyDto } from './dto/todo.dto'
import { ApiTags, ApiCreatedResponse, ApiQuery, ApiOkResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { interval, map, Observable } from 'rxjs'

@ApiBearerAuth()
@ApiTags('Todos')
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) { }

  @Sse('sse')
  @ApiOperation({ summary: 'Get records one by one, server-sent events!' })
  async getRecordsOneByOne(): Promise<Observable<MessageEvent>> {
    const data = await this.todoService.findAll({})
    return interval(5000).pipe(map((i) => ({ data: data[i] })))
  }

  @Get('')
  @ApiOperation({ summary: 'Find records.' })
  @ApiQuery({ name: 'size', required: false })
  @ApiQuery({ name: 'index', required: false })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'date', required: false })
  @ApiQuery({ name: 'content', required: false })
  @ApiQuery({ name: 'order', enum: ['title', 'date', 'content'], required: false })
  @ApiQuery({ name: 'direction', enum: ['asc', 'desc'], required: false })
  @ApiOkResponse({ description: 'Find records successfully.', type: [TodoReturnDto] })
  async getTodos(@Query('size') size: string, @Query('index') index: string, @Query('title') title: string, @Query('date') date: string, @Query('content') content: string, @Query('order') order: string, @Query('direction') direction: string): Promise<TodoReturnDto[]> {
    return this.todoService.findAll({ size: Number(size), index: Number(index), title, date, content, order, direction })
  }

  @Post()
  @ApiOperation({ summary: 'Create a new record.' })
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: TodoReturnDto })
  async postTodo(@Body() todoCreateDto: TodoCreateDto): Promise<TodoReturnDto> {
    return this.todoService.createOne(todoCreateDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a record by id.' })
  @ApiOkResponse({ description: 'Find a record successfully.', type: TodoReturnDto })
  async getTodoById(@Param('id') id: string): Promise<TodoReturnDto> {
    return this.todoService.findOneById(Number(id))
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Find a record by id and modify it.' })
  @ApiOkResponse({ description: 'Modify a record successfully.', type: TodoReturnDto })
  async patchTodoById(@Param('id') id: string, @Body() todoModifyDto: TodoModifyDto): Promise<TodoReturnDto> {
    return this.todoService.modifyOneById(Number(id), todoModifyDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Find a record by id and delete it.' })
  @ApiOkResponse({ description: 'Delete a record successfully.', type: TodoReturnDto })
  async deleteTodoById(@Param('id') id: string): Promise<TodoReturnDto> {
    return this.todoService.deleteOneById(Number(id))
  }
}
