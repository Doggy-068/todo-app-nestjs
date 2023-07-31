import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Press } from '../../../entity/press.entity'

@Injectable()
export class PressService {
  constructor(@InjectRepository(Press) private pressRepository: Repository<Press>) { }

  async findById(id: number) {
    return await this.pressRepository.findOneBy({ id })
  }

  async findByBookId(bookId: number) {
    return await this.pressRepository.findOne({ relations: ['books'], where: { books: { id: bookId } } })
  }

  async create(name: string) {
    const entity = this.pressRepository.create({ name })
    await this.pressRepository.insert(entity)
    return entity
  }
}
