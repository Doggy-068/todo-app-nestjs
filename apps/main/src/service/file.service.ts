import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'
import { FileMeTaEntity } from '../entity/file.meta.entity'

@Injectable()
export class FileService {
  constructor(@InjectRepository(FileMeTaEntity) private fileMetaRepository: Repository<FileMeTaEntity>) { }

  selectFileMeta(data: { id?: string }) {
    return this.fileMetaRepository.findOneBy({ id: data.id })
  }
}
