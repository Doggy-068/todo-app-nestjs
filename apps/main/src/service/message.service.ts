import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { MessageEntity } from '../entity/message.entity'
import { UserEntity } from '../entity/user.entity'

@Injectable()
export class MessageService {
  constructor(@InjectRepository(MessageEntity) private messageRepository: Repository<MessageEntity>) { }

  async insertMessage(data: Partial<MessageEntity>) {
    const entity = this.messageRepository.create({
      content: data.content,
      date: data.date,
      sender: data.sender,
      recipient: data.recipient
    })
    await this.messageRepository.insert(entity)
    return entity
  }

  selectLastMessage(userId: string, contactId: string) {
    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndMapOne('message.sender', UserEntity, 'sender', 'sender.id = senderId')
      .leftJoinAndMapOne('message.recipient', UserEntity, 'recipient', 'recipient.id = recipientId')
      .where('(senderId = :userId and recipientId = :contactId) or (senderId = :contactId and recipientId = :userId)', { userId, contactId })
      .orderBy('date', 'DESC')
      .getOne()
  }

  selectMessages(userId: string, contactId: string) {
    return this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndMapOne('message.sender', UserEntity, 'sender', 'sender.id = senderId')
      .leftJoinAndMapOne('message.recipient', UserEntity, 'recipient', 'recipient.id = recipientId')
      .where('(senderId = :userId and recipientId = :contactId) or (senderId = :contactId and recipientId = :userId)', { userId, contactId })
      .orderBy('date', 'ASC')
      .getMany()
  }
}
