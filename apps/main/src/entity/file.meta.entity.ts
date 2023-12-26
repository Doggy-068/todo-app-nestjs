import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { MailboxMailEntity } from './mailbox.mail.entity'

@Entity({ name: 'FILE_META' })
export class FileMeTaEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({ name: 'url', nullable: false, unique: true })
  url: string

  @Column({ name: 'filename', nullable: false })
  filename: string

  @Column({ name: 'size', type: 'integer', nullable: false })
  size: number

  @ManyToMany(type => MailboxMailEntity, mail => mail.annexes)
  mails: MailboxMailEntity[]
}
