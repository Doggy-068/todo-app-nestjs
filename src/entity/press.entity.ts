import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Book } from './book.entity'

@Entity()
export class Press {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, nullable: false })
  name: string

  @OneToMany(() => Book, book => book.press)
  books: Book[]
}
