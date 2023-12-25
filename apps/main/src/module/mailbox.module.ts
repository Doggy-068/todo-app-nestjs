import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../entity/user.entity'
import { MailboxFolderEntity } from '../entity/mailbox.folder.entity'
import { MailboxController } from '../controller/mailbox.controller'
import { UserService } from '../service/user.service'
import { MailboxService } from '../service/mailbox.service'
import { MailEntity } from '../entity/mail.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, MailboxFolderEntity, MailEntity])
  ],
  providers: [
    UserService,
    MailboxService
  ],
  controllers: [
    MailboxController
  ]
})
export class MailboxModule { }
