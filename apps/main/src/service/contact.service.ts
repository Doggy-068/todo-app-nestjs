import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { UserEntity } from '../entity/user.entity'

@Injectable()
export class ContactService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

  selectContacts(userId: string) {
    return this.userRepository.createQueryBuilder().where('id != :id', { id: userId }).getMany()
  }
}
