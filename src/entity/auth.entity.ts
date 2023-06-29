import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  account: string

  @Column()
  password: string
}
