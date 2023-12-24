import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleEntity } from '../entity/role.entity'
import { UserEntity } from '../entity/user.entity'
import { MessageEntity } from '../entity/message.entity'
import { AuthModule } from './auth.module'
import { AuthGuard } from '../guard/auth.guard'
import { APP_GUARD } from '@nestjs/core'
import { MessageModule } from './message.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '.database/data.db',
      entities: [RoleEntity, UserEntity, MessageEntity]
    }),
    AuthModule,
    MessageModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule { }
