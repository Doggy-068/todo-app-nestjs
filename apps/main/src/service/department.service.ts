import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DepartmentEntity } from '../entity/department.entity'
import type { Repository } from 'typeorm'

@Injectable()
export class DepartmentService {
  constructor(@InjectRepository(DepartmentEntity) private departmentRepository: Repository<DepartmentEntity>) { }

  selectRoot() {
    return this.departmentRepository.createQueryBuilder().where('parent_id IS NULL').getOne()
  }

  selectOne(data: { id: string }) {
    return this.departmentRepository.findOneBy(data)
  }

  selectChildren(departmentId: string) {
    return this.departmentRepository.createQueryBuilder().where('parent_id = :departmentId', { departmentId }).getMany()
  }
}
