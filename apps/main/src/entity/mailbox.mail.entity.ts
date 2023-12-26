import { Column, DeleteDateColumn, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './user.entity'
import { MailboxFolderEntity } from './mailbox.folder.entity'
import { FileMeTaEntity } from './file.meta.entity'

@Entity({ name: 'MAILBOX_MAIL' })
export class MailboxMailEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @CreateDateColumn({ name: 'date', nullable: false })
  date: Date

  @Column({ name: 'title', nullable: false })
  title: string

  @Column({ name: 'content', nullable: false })
  content: string

  @Column({ name: 'sender_mailbox', nullable: false })
  senderMailbox: string

  @Column({ name: 'recipient_mailboxes', type: 'simple-array', nullable: false })
  recipientMailboxes: string[]

  @Column({ name: 'carbon_copies', type: 'simple-array', nullable: true })
  carbonCopies: string[]

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
  mailboxFolder: MailboxFolderEntity
}
