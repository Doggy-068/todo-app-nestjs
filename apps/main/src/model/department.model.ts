import { Field, ObjectType } from '@nestjs/graphql'
import { UserModel } from './staff.model'

@ObjectType()
export class DepartmentModel {
  @Field()
  id: string

  @Field()
  name: string

  @Field(type => [UserModel])
  staff: UserModel[]

  @Field(type => [DepartmentModel])
  children: DepartmentModel[]
}
