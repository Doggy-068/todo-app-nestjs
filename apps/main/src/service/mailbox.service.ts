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

  selectMailboxFolders(userId: string) {
    return this.mailboxFolderRepository.createQueryBuilder().where('is_common = true or user_id = :userId', { userId }).getMany()
  }

  selectMailboxDraftFolder() {
    return this.mailboxFolderRepository.createQueryBuilder().where(`is_common = true and identify = 'draft'`).getOne()
  }

  async insertMail(data: Partial<MailboxMailEntity>) {
    const entity = this.mailRepository.create(data)
    await this.mailRepository.insert(entity)
    return entity
  }
}
