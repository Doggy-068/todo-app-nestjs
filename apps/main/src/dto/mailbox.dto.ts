import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class MailboxUserReturnDto {
  @ApiProperty()
  mailbox: string
}

class MailboxFolderReturnDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string
}

export class MailboxFoldersReturnDto {
  @ApiProperty({ type: () => MailboxUserReturnDto })
  user: MailboxUserReturnDto

  @ApiProperty({ type: () => [MailboxFolderReturnDto] })
  folders: MailboxFolderReturnDto[]
}

class MailboxMailInListReturnDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  date: string

  @ApiProperty()
  title: string

  @ApiProperty()
  senderMailbox: string

  @ApiProperty()
  recipientMailboxes: string[]
}

export class MailboxMailListReturnDto {
  @ApiProperty({ type: () => MailboxFolderReturnDto })
  folder: MailboxFolderReturnDto

  @ApiProperty({ type: () => [MailboxMailInListReturnDto] })
  list: MailboxMailInListReturnDto[]
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

export class MailboxMailReturn extends MailboxMailInListReturnDto {
  @ApiProperty()
  carbonCopies: string[]

  @ApiProperty()
  content: string

  @ApiProperty({ type: () => [MailBoxMailFileMetaReturn] })
  annexes: MailBoxMailFileMetaReturn[]
}
