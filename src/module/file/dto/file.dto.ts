import { ApiProperty } from '@nestjs/swagger'

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any
}

export class FileReturnDto {
  @ApiProperty()
  url: string
}
