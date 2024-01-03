import { Column, Entity, OneToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity({ name: 'DEPARTMENT' })
export class DepartmentEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string

  @Column({ name: 'name', nullable: false, unique: true })
  name: string

  @ManyToOne(type => DepartmentEntity, department => department.children)
  @JoinColumn({ name: 'parent_id', referencedColumnName: 'id' })
  parent: DepartmentEntity

  @OneToMany(type => DepartmentEntity, department => department.parent)
  children: DepartmentEntity[]

  @OneToMany(type => UserEntity, user => user.department)
  staff: UserEntity[]
}
