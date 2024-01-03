import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LogPerfModel, LogPerfSchema } from '../schema/log.perf.schema'
import { LogService } from '../service/log.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LogPerfModel.name, schema: LogPerfSchema }])
  ],
  providers: [
    LogService
  ],
  exports: [
    LogService
  ]
})
export class LogModule { }
