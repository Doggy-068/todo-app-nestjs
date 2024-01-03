import { Field, ObjectType } from '@nestjs/graphql'
import { DepartmentModel } from './department.model'

@ObjectType()
export class UserModel {
  @Field()
  id: string

  @Field()
  nickname: string

  @Field()
  mailbox: string

  @Field(type => DepartmentModel)
  department: DepartmentModel
}
