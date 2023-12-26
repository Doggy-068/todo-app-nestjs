import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserService } from '../service/user.service'
import { MailboxService } from '../service/mailbox.service'
import { MailboxFoldersReturnDto, MailboxSaveDraftDto, MailboxMailReturn } from '../dto/mailbox.dto'
import { FileService } from '../service/file.service'

@ApiTags('Mailbox')
@ApiBearerAuth()
@Controller('/api/mailbox')
export class MailboxController {
  constructor(
    private userService: UserService,
    private mailboxService: MailboxService,
    private fileService: FileService
  ) { }

  @ApiOperation({
    summary: '获取邮箱文件夹列表'
  })
  @ApiOkResponse({
    type: [MailboxFoldersReturnDto]
  })
  @Get('folder/list')
  async getMailboxFolderList(@Request() request): Promise<MailboxFoldersReturnDto> {
    const userId = request['user'].id
    const [user, folders] = await Promise.all([
      this.userService.selectUser({ id: userId }),
      this.mailboxService.selectMailboxFolders(userId)
    ])
    return {
      user: {
        id: user.id,
        mailbox: user.mailbox
      },
      folders: folders.map(folder => ({
        id: folder.id,
        name: folder.name,
        isCommon: folder.isCommon
      }))
    }
  }

  @ApiOperation({
    summary: '保存草稿'
  })
  @ApiCreatedResponse({
    type: MailboxMailReturn
  })
  @Post('mail/draft/save')
  async saveMailDraft(@Request() request, @Body() saveDraftData: MailboxSaveDraftDto): Promise<MailboxMailReturn> {
    const userId = request['user'].id
    const sender = await this.userService.selectUser({ id: userId })
    const draftFolder = await this.mailboxService.selectMailboxDraftFolder()
    const mail = await this.mailboxService.insertMail({
      title: saveDraftData.title,
      content: saveDraftData.content,
      senderMailbox: sender.mailbox,
      recipientMailboxes: saveDraftData.recipientMailboxes,
      carbonCopies: saveDraftData.carbonCopies,
      annexes: await Promise.all(saveDraftData.annexes.map(id => {
        return this.fileService.selectFileMeta({ id })
      })),
      user: sender,
      mailboxFolder: draftFolder
    })
    return {
      id: mail.id,
      date: mail.date.toISOString(),
      title: mail.title,
      content: mail.content,
      senderMailbox: mail.senderMailbox,
      recipientMailboxes: mail.recipientMailboxes,
      carbonCopies: mail.carbonCopies,
      annexes: mail.annexes.map(annex => ({
        id: annex.id,
        url: annex.url,
        filename: annex.filename,
        size: annex.size
      }))
    }
  }
}
