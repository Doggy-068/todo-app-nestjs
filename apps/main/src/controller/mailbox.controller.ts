import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserService } from '../service/user.service'
import { MailboxService } from '../service/mailbox.service'
import { MailboxFoldersReturnDto, MailboxSaveDraftDto, MailboxMailReturn, MailboxUserReturnDto, MailboxMailListReturnDto } from '../dto/mailbox.dto'
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
    summary: '获取邮箱'
  })
  @ApiOkResponse({
    type: MailboxUserReturnDto
  })
  @Get('user')
  async getMailbox(@Request() request): Promise<MailboxUserReturnDto> {
    const userId = request['user'].id
    const user = await this.userService.selectUser({ id: userId })
    return {
      mailbox: user.mailbox
    }
  }

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
        mailbox: user.mailbox
      },
      folders: folders.map(folder => ({
        id: folder.id,
        name: folder.name
      }))
    }
  }

  @ApiOperation({
    summary: '获取邮件列表'
  })
  @ApiOkResponse({
    type: MailboxMailListReturnDto
  })
  @Get('mail/list')
  async getMailList(@Request() request, @Query('mailbox') mailboxId: string): Promise<MailboxMailListReturnDto> {
    const userId = request['user'].id
    const mailboxFolder = await this.mailboxService.selectMailboxFolder(userId, mailboxId)
    const mailList = await this.mailboxService.selectMails(userId, mailboxId)
    return {
      folder: {
        id: mailboxFolder.id,
        name: mailboxFolder.name
      },
      list: mailList.map(mail => ({
        id: mail.id,
        date: mail.date.toISOString(),
        title: mail.title,
        senderMailbox: mail.senderMailbox,
        recipientMailboxes: mail.recipientMailboxes
      }))
    }
  }

  @ApiOperation({
    summary: '获取邮件'
  })
  @ApiOkResponse({
    type: MailboxMailReturn
  })
  @Get('mail')
  async getMail(@Request() request, @Query('mail') mailId: string): Promise<MailboxMailReturn> {
    const userId = request['user'].id
    const mail = await this.mailboxService.selectMail(userId, mailId)
    return {
      id: mail.id,
      date: mail.date.toISOString(),
      title: mail.title,
      senderMailbox: mail.senderMailbox,
      recipientMailboxes: mail.recipientMailboxes,
      carbonCopies: mail.carbonCopies,
      content: mail.content,
      annexes: mail.annexes
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
