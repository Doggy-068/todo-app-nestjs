import { ApiProperty } from '@nestjs/swagger'

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
  id: string

  @ApiProperty()
  title: string

  @ApiProperty()
  content: string

  @ApiProperty()
  recipientMailboxes: string[]

  @ApiProperty()
  carbonCopies: string[]

  @ApiProperty()
  annexes: string[]
}
