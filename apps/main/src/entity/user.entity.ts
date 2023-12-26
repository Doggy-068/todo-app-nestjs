import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm'
import { RoleEntity } from './role.entity'
import { MessageEntity } from './message.entity'
import { MailboxFolderEntity } from './mailbox.folder.entity'
import { MailboxMailEntity } from './mailbox.mail.entity'

@Entity({ name: 'USER' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({ name: 'username', nullable: false, unique: true })
  username: string

  @Column({ name: 'password', nullable: false })
  password: string

  @Column({ name: 'nickname', nullable: false })
  nickname: string

  @Column({ name: 'mailbox', nullable: false, unique: true })
  mailbox: string

  @ManyToOne(type => RoleEntity, role => role.users)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: RoleEntity

  @OneToMany(type => MessageEntity, message => message.sender)
  sendMessages: MessageEntity[]

  @OneToMany(type => MessageEntity, message => message.recipient)
  receiveMessages: MessageEntity[]

  @OneToMany(type => MailboxFolderEntity, mailboxFolder => mailboxFolder.user)
  customMailboxFolders: MailboxFolderEntity[]

  @OneToMany(type => MailboxMailEntity, mail => mail.user)
  mails: MailboxMailEntity[]
}
