import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { MailboxFolderEntity } from '../entity/mailbox.folder.entity'
import { MailboxMailEntity } from '../entity/mailbox.mail.entity'

@Injectable()
export class MailboxService {
  constructor(
    @InjectRepository(MailboxFolderEntity) private mailboxFolderRepository: Repository<MailboxFolderEntity>,
    @InjectRepository(MailboxMailEntity) private mailRepository: Repository<MailboxMailEntity>
  ) { }

  selectMailboxFolder(userId: string, mailboxId: string) {
    return this.mailboxFolderRepository.createQueryBuilder().where('id = :mailboxId and (is_common = true or user_id = :userId)', { mailboxId, userId }).getOne()
  }

  selectMailboxFolders(userId: string) {
    return this.mailboxFolderRepository.createQueryBuilder().where('is_common = true or user_id = :userId', { userId }).getMany()
  }

  selectMailboxDraftFolder() {
    return this.mailboxFolderRepository.createQueryBuilder().where(`is_common = true and identify = 'draft'`).getOne()
  }

  selectMails(userId: string, mailboxId: string) {
    return this.mailRepository.createQueryBuilder().where('user_id = :userId and mailbox_folder_id = :mailboxId', { userId, mailboxId }).orderBy('date', 'DESC').getMany()
  }

  selectMail(userId: string, mailId: string) {
    return this.mailRepository.createQueryBuilder().where('user_id = :userId and id = :mailId', { userId, mailId }).getOne()
  }

  async insertMail(data: Partial<MailboxMailEntity>) {
    const entity = this.mailRepository.create(data)
    await this.mailRepository.insert(entity)
    return entity
  }
}
