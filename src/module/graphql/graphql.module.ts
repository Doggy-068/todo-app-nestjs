import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { join } from 'path'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Book } from '../../entity/book.entity'
import { Press } from '../../entity/press.entity'
import { BookService } from './service/book.service'
import { PressService } from './service/press.service'
import { BookResolver } from './resolver/book.resolver'
import { PressResolver } from './resolver/press.resolver'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/module/graphql/schema.gql')
    }),
    TypeOrmModule.forFeature([Book, Press])
  ],
  providers: [
    BookService,
    PressService,
    BookResolver,
    PressResolver
  ]
})
export class GraphqlModule { }
