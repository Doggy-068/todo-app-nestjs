import { Resolver, Query, Args, Int, ResolveField, Parent, Mutation } from '@nestjs/graphql'
import { Book } from '../model/book.model'
import { BookService } from '../service/book.service'
import { PressService } from '../service/press.service'
import { Public } from '../../../decorator/public.decorator'

@Public()
@Resolver(of => Book)
export class BookResolver {
  constructor(
    private bookService: BookService,
    private pressService: PressService
  ) { }

  @Query(returns => Book)
  async book(@Args('id', { type: () => Int }) id: number) {
    return await this.bookService.findById(id)
  }

  @ResolveField()
  async press(@Parent() book: Book) {
    return await this.pressService.findByBookId(book.id)
  }

  @Mutation(returns => Book)
  async createBook(@Args('pressId', { type: () => Int }) pressId: number, @Args('isbn') isbn: string, @Args('name') name: string) {
    return await this.bookService.create(pressId, isbn, name)
  }
}
