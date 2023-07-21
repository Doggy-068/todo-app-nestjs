import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Press } from './press.entity'

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true, nullable: false })
  isbn: string

  @Column({ nullable: false })
  name: string

  @ManyToOne(type => Press)
  @JoinColumn({ name: 'press_id', referencedColumnName: 'id' })
  press: Press
}
