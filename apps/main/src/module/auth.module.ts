import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../entity/user.entity'
import { UserService } from '../service/user.service'
import { AuthService } from '../service/auth.service'
import { AuthController } from '../controller/auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../constant/jwt.constant'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '2h'
      }
    })
  ],
  providers: [
    UserService,
    AuthService
  ],
  controllers: [
    AuthController
  ]
})
export class AuthModule { }
