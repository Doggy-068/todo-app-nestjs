import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity({ name: 'MESSAGE' })
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({ name: 'content', nullable: false })
  content: string

  @CreateDateColumn({ name: 'date', nullable: false })
  date: Date

  @ManyToOne(type => UserEntity, user => user.sendMessages)
  @JoinColumn({ name: 'sender_id', referencedColumnName: 'id' })
  sender: UserEntity

  @ManyToOne(type => UserEntity, user => user.receiveMessages)
  @JoinColumn({ name: 'recipient_id', referencedColumnName: 'id' })
  recipient: UserEntity
}
