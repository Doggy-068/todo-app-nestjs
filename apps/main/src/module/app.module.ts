import { Module, ValidationPipe } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity } from '../entity/role.entity'
import { UserEntity } from '../entity/user.entity'
import { MessageEntity } from '../entity/message.entity'
import { MailboxFolderEntity } from '../entity/mailbox.folder.entity'
import { AuthModule } from './auth.module'
import { AuthGuard } from '../guard/auth.guard'
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { MessageModule } from './message.module'
import { MailboxModule } from './mailbox.module'
import { MailboxMailEntity } from '../entity/mailbox.mail.entity'
import { FileMeTaEntity } from '../entity/file.meta.entity'
import { MongooseModule } from '@nestjs/mongoose'
import { LogModule } from './log.module'
import { LogPerfInterceptor } from '../interceptor/log.perf.interceptor'
import { DepartmentEntity } from '../entity/department.entity'
import { DepartmentModule } from './department.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '.database/data.db',
      entities: [RoleEntity, UserEntity, MessageEntity, MailboxFolderEntity, MailboxMailEntity, FileMeTaEntity, DepartmentEntity],
      synchronize: true
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/todo_app_nestjs'),
    AuthModule,
    MessageModule,
    MailboxModule,
    LogModule,
    DepartmentModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LogPerfInterceptor
    }
  ]
})
export class AppModule { }
