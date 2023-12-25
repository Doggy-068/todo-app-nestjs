import { Body, Controller, Get, Post, Request } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserService } from '../service/user.service'
import { MailboxService } from '../service/mailbox.service'
import { MailboxFoldersReturnDto, MailboxSaveDraftDto } from '../dto/mailbox.dto'

@ApiTags('Mailbox')
@ApiBearerAuth()
@Controller('/api/mailbox')
export class MailboxController {
  constructor(
    private userService: UserService,
    private mailboxService: MailboxService
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
  @Post('mail/draft/save')
  saveMailDraft(@Request() request, @Body() saveDraftData: MailboxSaveDraftDto) {
    const userId = request['user'].id

  }
}
