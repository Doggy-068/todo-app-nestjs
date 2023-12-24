import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  content: string

  @Column({ nullable: false })
  date: Date

  @ManyToOne(type => UserEntity, user => user.sendMessages)
  sender: UserEntity

  @ManyToOne(type => UserEntity, user => user.receiveMessages)
  recipient: UserEntity
}
