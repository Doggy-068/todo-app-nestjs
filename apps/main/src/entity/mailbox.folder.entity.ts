import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './user.entity'
import { MailEntity } from './mail.entity'

@Entity({ name: 'MAILBOX_FOLDER' })
export class MailboxFolderEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({ name: 'name', nullable: false })
  name: string

  @Column({ name: 'is_common', nullable: false })
  isCommon: boolean

  @ManyToOne(type => UserEntity, user => user.customMailboxFolders)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity

  @OneToMany(type => MailEntity, mail => mail.mailboxFolder)
  mails: MailEntity[]
}
