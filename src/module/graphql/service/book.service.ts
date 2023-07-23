import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Book } from '../../../entity/book.entity'

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) { }

  async findById(id: number) {
    return await this.bookRepository.findOneBy({ id })
  }

  async findByPressId(pressId: number) {
    return await this.bookRepository.find({ relations: ['press'], where: { press: { id: pressId } } })
  }
}
