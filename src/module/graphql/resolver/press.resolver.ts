import { Resolver, Query, Args, Int, ResolveField, Parent, Mutation } from '@nestjs/graphql'
import { Press } from '../model/press.model'
import { BookService } from '../service/book.service'
import { PressService } from '../service/press.service'

@Resolver(of => Press)
export class PressResolver {
  constructor(
    private bookService: BookService,
    private pressService: PressService
  ) { }

  @Query(returns => Press)
  async press(@Args('id', { type: () => Int }) id: number) {
    return await this.pressService.findById(id)
  }

  @ResolveField()
  async books(@Parent() press: Press) {
    return await this.bookService.findByPressId(press.id)
  }

  @Mutation(returns => Press)
  async createPress(@Args('name') name: string) {
    return await this.pressService.create(name)
  }
}
