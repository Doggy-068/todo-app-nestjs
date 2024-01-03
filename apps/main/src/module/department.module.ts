import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { DepartmentEntity } from '../entity/department.entity'
import { UserEntity } from '../entity/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DepartmentService } from '../service/department.service'
import { DepartmentResolver } from '../resolver/department.resolver'
import { UserService } from '../service/user.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([DepartmentEntity, UserEntity]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/department'
    })
  ],
  providers: [
    DepartmentService,
    UserService,
    DepartmentResolver
  ]
})
export class DepartmentModule { }
