import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Book } from '../../../entity/book.entity'
import { Press } from '../../../entity/press.entity'

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Press) private pressRepository: Repository<Press>
  ) { }

  async findById(id: number) {
    return await this.bookRepository.findOneBy({ id })
  }

  async findByPressId(pressId: number) {
    return await this.bookRepository.find({ relations: ['press'], where: { press: { id: pressId } } })
  }

  async create(pressId: number, isbn: string, name: string) {
    const press = await this.pressRepository.findOneBy({ id: pressId })
    const entity = this.bookRepository.create({ isbn, name, press })
    await this.bookRepository.insert(entity)
    return entity
  }
}
