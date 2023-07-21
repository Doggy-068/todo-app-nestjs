import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  account: string

  @Column({ nullable: false })
  password: string
}
