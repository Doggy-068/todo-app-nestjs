import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Auth } from '../../entity/auth.entity'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auth) private authRepository: Repository<Auth>, private jwtService: JwtService) { }

  async validateAccountAndPassword(account: string, password: string): Promise<boolean> {
    if (await this.authRepository.findOneBy({ account, password })) {
      return true
    }
    return false
  }

  async generateToken(payload: { account: string }): Promise<string> {
    return await this.jwtService.signAsync(payload)
  }
}
