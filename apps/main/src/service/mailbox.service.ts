import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { MailboxFolderEntity } from '../entity/mailbox.folder.entity'
import { MailEntity } from '../entity/mail.entity'

@Injectable()
export class MailboxService {
  constructor(
    @InjectRepository(MailboxFolderEntity) private mailboxFolderRepository: Repository<MailboxFolderEntity>,
    @InjectRepository(MailEntity) private mailRepository: Repository<MailEntity>
  ) { }

  selectMailboxFolders(userId: string) {
    return this.mailboxFolderRepository.createQueryBuilder().where('is_common = true or user_id = :userId', { userId }).getMany()
  }
}
