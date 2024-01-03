import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { LogPerfModel } from '../schema/log.perf.schema'
import type { Model } from 'mongoose'

@Injectable()
export class LogService {
  constructor(@InjectModel(LogPerfModel.name) private logPerfModel: Model<LogPerfModel>) { }

  insertLogPerf(data: { url: string, method: string, timeTake: number }) {
    return new this.logPerfModel({ url: data.url, method: data.method, time_take: data.timeTake }).save()
  }
}
