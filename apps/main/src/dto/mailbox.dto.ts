import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator'

class MailboxUserReturnDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  mailbox: string
}

class MailboxFolderReturnDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  isCommon: boolean
}

export class MailboxFoldersReturnDto {
  @ApiProperty({ type: () => MailboxUserReturnDto })
  user: MailboxUserReturnDto

  @ApiProperty({ type: () => [MailboxFolderReturnDto] })
  folders: MailboxFolderReturnDto[]
}

export class MailboxSaveDraftDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string

  @ApiProperty()
  @IsArray()
  @IsEmail(undefined, { each: true })
  recipientMailboxes: string[]

  @ApiProperty()
  @IsArray()
  @IsEmail(undefined, { each: true })
  carbonCopies: string[]

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  annexes: string[]
}

class MailBoxMailFileMetaReturn {
  @ApiProperty()
  id: string

  @ApiProperty()
  url: string

  @ApiProperty()
  filename: string

  @ApiProperty()
  size: number
}

export class MailboxMailReturn {
  @ApiProperty()
  id: string

  @ApiProperty()
  date: string

  @ApiProperty()
  title: string

  @ApiProperty()
  content: string

  @ApiProperty()
  senderMailbox: string

  @ApiProperty()
  recipientMailboxes: string[]

  @ApiProperty()
  carbonCopies: string[]

  @ApiProperty({ type: () => [MailBoxMailFileMetaReturn] })
  annexes: MailBoxMailFileMetaReturn[]
}
