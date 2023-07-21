import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Press } from './press.model'

@ObjectType()
export class Book {
  @Field(type => Int)
  id: number

  @Field({ nullable: false })
  isbn: string

  @Field({ nullable: false })
  name: string

  @Field(type => Press, { nullable: false })
  press: Press
}
