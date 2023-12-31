import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { UserEntity } from '../entity/user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

  selectUser(data: { id?: string, username?: string, password?: string }) {
    return this.userRepository.findOneBy(data)
  }

  selectStaff(departmentId: string) {
    return this.userRepository.createQueryBuilder().where('department_id = :departmentId', { departmentId }).getMany()
  }
}
