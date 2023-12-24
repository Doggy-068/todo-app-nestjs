import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'
import { RoleEntity } from './role.entity'
import { MessageEntity } from './message.entity'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false, unique: true })
  username: string

  @Column({ nullable: false })
  password: string

  @Column({ nullable: false })
  nickname: string

  @ManyToOne(type => RoleEntity, role => role.users)
  role: RoleEntity

  @OneToMany(type => MessageEntity, message => message.sender)
  sendMessages: MessageEntity[]

  @OneToMany(type => MessageEntity, message => message.recipient)
  receiveMessages: MessageEntity[]
}
