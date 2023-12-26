import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity({ name: 'ROLE' })
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({ name: 'name', nullable: false, unique: true })
  name: string

  @OneToMany(type => UserEntity, user => user.role)
  users: UserEntity[]
}
