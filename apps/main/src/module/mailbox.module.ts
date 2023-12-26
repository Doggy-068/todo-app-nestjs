import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../entity/user.entity'
import { MailboxFolderEntity } from '../entity/mailbox.folder.entity'
import { MailboxController } from '../controller/mailbox.controller'
import { UserService } from '../service/user.service'
import { MailboxService } from '../service/mailbox.service'
import { MailboxMailEntity } from '../entity/mailbox.mail.entity'
import { FileMeTaEntity } from '../entity/file.meta.entity'
import { FileService } from '../service/file.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, MailboxFolderEntity, MailboxMailEntity, FileMeTaEntity])
  ],
  providers: [
    UserService,
    MailboxService,
    FileService
  ],
  controllers: [
    MailboxController
  ]
})
export class MailboxModule { }
