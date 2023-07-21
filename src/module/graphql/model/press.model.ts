import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Book } from './book.model'

@ObjectType()
export class Press {
  @Field(type => Int)
  id: number

  @Field({ nullable: false })
  name: string

  @Field(type => [Book], { nullable: 'items' })
  books: Book[]
}
