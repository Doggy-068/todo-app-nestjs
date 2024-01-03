import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ collection: 'log_perf', timestamps: { createdAt: 'date', updatedAt: false } })
export class LogPerfModel {
  @Prop({ required: true })
  url: string

  @Prop({ required: true })
  method: string

  @Prop({ required: true, min: 0 })
  time_take: number
}

export const LogPerfSchema = SchemaFactory.createForClass(LogPerfModel)
