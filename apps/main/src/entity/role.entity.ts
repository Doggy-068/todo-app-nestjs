import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ enum: ['root', 'admin', 'user'] })
  name: string

  @OneToMany(type => UserEntity, user => user.role)
  users: UserEntity[]
}
