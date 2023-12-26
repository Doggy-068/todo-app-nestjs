import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity } from '../entity/role.entity'
import { UserEntity } from '../entity/user.entity'
import { MessageEntity } from '../entity/message.entity'
import { MailboxFolderEntity } from '../entity/mailbox.folder.entity'
import { AuthModule } from './auth.module'
import { AuthGuard } from '../guard/auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { MessageModule } from './message.module'
import { MailboxModule } from './mailbox.module'
import { MailboxMailEntity } from '../entity/mailbox.mail.entity'
import { FileMeTaEntity } from '../entity/file.meta.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '.database/data.db',
      entities: [RoleEntity, UserEntity, MessageEntity, MailboxFolderEntity, MailboxMailEntity, FileMeTaEntity],
      synchronize: true
    }),
    AuthModule,
    MessageModule,
    MailboxModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule { }
