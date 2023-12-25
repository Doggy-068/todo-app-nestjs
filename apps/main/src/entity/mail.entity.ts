import { Column, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './user.entity'
import { MailboxFolderEntity } from './mailbox.folder.entity'
import { FileMeTaEntity } from './file.meta.entity'

@Entity({ name: 'MAIL' })
export class MailEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({ name: 'date', nullable: false })
  date: Date

  @Column({ name: 'title', nullable: false })
  title: string

  @Column({ name: 'content', nullable: false, comment: 'HTML' })
  content: string

  @Column({ name: 'sender_mailbox', nullable: false })
  senderMailbox: string

  @Column({ name: 'recipient_mailboxes', nullable: false, comment: 'JSON数组 [string]' })
  recipientMailboxes: string

  @Column({ name: 'carbon_copies', nullable: true, comment: 'JSON数组 [string]' })
  carbonCopies: string

  @DeleteDateColumn({ name: 'soft_delete_date' })
  softDeleteDate: Date

  @ManyToMany(type => FileMeTaEntity, fileMeta => fileMeta.mails)
  @JoinTable({
    name: 'MAIL_2_FILE_META',
    joinColumn: {
      name: 'mail_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'file_meta_id',
      referencedColumnName: 'id'
    }
  })
  annexes: FileMeTaEntity[]

  @ManyToOne(type => UserEntity, user => user.mails)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity

  @ManyToOne(type => MailboxFolderEntity, mailboxFolder => mailboxFolder.mails)
  @JoinColumn({ name: 'mailbox_folder_id', referencedColumnName: 'id' })
  mailboxFolder: MailboxFolderEntity[]
}
