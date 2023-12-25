import { Body, Controller, Get, NotFoundException, Post, Query, Request } from '@nestjs/common'
import { UserService } from '../service/user.service'
import { MessageService } from '../service/message.service'
import { ContactService } from '../service/contact.service'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { MessageSendDto, MessageReturnDto, MessageLastReturnDto, MessageListReturnDto } from '../dto/message.dto'

@ApiTags('Message')
@ApiBearerAuth()
@Controller('/api/message')
export class MessageController {
  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private contactService: ContactService
  ) { }

  @ApiOperation({
    summary: '给指定 ID 的联系人发送消息'
  })
  @ApiCreatedResponse({
    type: MessageReturnDto
  })
  @Post('send')
  async sendMessage(@Request() request, @Body() sendMessageDto: MessageSendDto): Promise<MessageReturnDto> {
    const senderId = request['user'].id
    const sender = await this.userService.selectUser({ id: senderId })
    const recipient = await this.userService.selectUser({ id: sendMessageDto.recipientId })
    const entity = await this.messageService.insertMessage({
      content: sendMessageDto.content,
      sender,
      recipient
    })
    return {
      id: entity.id,
      content: entity.content,
      date: entity.date.toISOString(),
      sender: {
        id: entity.sender.id,
        nickname: entity.sender.nickname
      },
      recipient: {
        id: entity.recipient.id,
        nickname: entity.recipient.nickname
      }
    }
  }

  @Get('last/list')
  @ApiOperation({
    summary: '获取最后消息列表'
  })
  @ApiOkResponse({
    type: [MessageLastReturnDto]
  })
  async getLastMessageList(@Request() request): Promise<MessageLastReturnDto[]> {
    const userId = request['user'].id
    const contacts = await this.contactService.selectContacts(userId)
    return (await Promise.all(contacts.map(async (contact) => {
      const message = await this.messageService.selectLastMessage(userId, contact.id)
      return message === null ? null : {
        contact: {
          id: contact.id,
          nickname: contact.nickname
        },
        message: {
          id: message.id,
          content: message.content,
          date: message.date.toISOString(),
          sender: {
            id: message.sender.id,
            nickname: message.sender.nickname
          },
          recipient: {
            id: message.recipient.id,
            nickname: message.recipient.nickname
          }
        }
      }
    }))).filter(item => item !== null)
  }

  @ApiOperation({
    summary: '获取和指定 ID 的联系人的消息列表'
  })
  @ApiOkResponse({
    type: MessageListReturnDto
  })
  @Get('list')
  async getMessageList(@Request() request, @Query('contactId') contactId: string): Promise<MessageListReturnDto> {
    const userId = request['user'].id
    const contact = await this.userService.selectUser({ id: contactId })
    if (contact === null) {
      throw new NotFoundException()
    }
    return {
      contact: {
        id: contact.id,
        nickname: contact.nickname
      },
      messages: (await this.messageService.selectMessages(userId, contactId)).map(message => {
        return {
          id: message.id,
          content: message.content,
          date: message.date.toISOString(),
          sender: {
            id: message.sender.id,
            nickname: message.sender.nickname
          },
          recipient: {
            id: message.recipient.id,
            nickname: message.recipient.nickname
          }
        }
      })
    }
  }
}
