import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../entity/user.entity'
import { MessageEntity } from '../entity/message.entity'
import { UserService } from '../service/user.service'
import { MessageService } from '../service/message.service'
import { MessageController } from '../controller/message.controller'
import { ContactService } from '../service/contact.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, MessageEntity])
  ],
  providers: [
    UserService,
    MessageService,
    ContactService
  ],
  controllers: [
    MessageController
  ]
})
export class MessageModule { }
