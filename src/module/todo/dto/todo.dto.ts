import { ApiProperty } from '@nestjs/swagger'

export class TodoReturnDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  title: string

  @ApiProperty()
  date: string

  @ApiProperty()
  content: string
}

export class TodoCreateDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  date: string

  @ApiProperty()
  content: string
}

export class TodoModifyDto {
  @ApiProperty({ required: false })
  title?: string

  @ApiProperty({ required: false })
  date?: string

  @ApiProperty({ required: false })
  content?: string
}
