import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { MessageEntity } from '../entity/message.entity'
import { UserEntity } from '../entity/user.entity'

@Injectable()
export class MessageService {
  constructor(@InjectRepository(MessageEntity) private messageRepository: Repository<MessageEntity>) { }

  async insertMessage(data: Pick<MessageEntity, 'content' | 'sender' | 'recipient'>) {
    const entity = this.messageRepository.create({
      content: data.content,
      sender: data.sender,
      recipient: data.recipient
    })
    await this.messageRepository.insert(entity)
    return entity
  }

  selectLastMessage(userId: string, contactId: string) {
    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndMapOne('message.sender', UserEntity, 'sender', 'sender.id = sender_id')
      .leftJoinAndMapOne('message.recipient', UserEntity, 'recipient', 'recipient.id = recipient_id')
      .where('(sender_id = :userId and recipient_id = :contactId) or (sender_id = :contactId and recipient_id = :userId)', { userId, contactId })
      .orderBy('date', 'DESC')
      .getOne()
  }

  selectMessages(userId: string, contactId: string) {
    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndMapOne('message.sender', UserEntity, 'sender', 'sender.id = sender_id')
      .leftJoinAndMapOne('message.recipient', UserEntity, 'recipient', 'recipient.id = recipient_id')
      .where('(sender_id = :userId and recipient_id = :contactId) or (sender_id = :contactId and recipient_id = :userId)', { userId, contactId })
      .orderBy('date', 'ASC')
      .getMany()
  }
}
