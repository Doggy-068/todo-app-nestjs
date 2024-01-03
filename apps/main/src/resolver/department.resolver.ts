import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { DepartmentModel } from '../model/department.model'
import { DepartmentService } from '../service/department.service'
import { UserService } from '../service/user.service'
import { UserModel } from '../model/staff.model'

@Resolver(of => DepartmentModel)
export class DepartmentResolver {
  constructor(
    private departmentService: DepartmentService,
    private userService: UserService
  ) { }

  @Query(returns => DepartmentModel)
  async department(@Args('id', { nullable: true }) id?: string): Promise<DepartmentModel> {
    if (id === undefined) {
      return this.departmentService.selectRoot()
    }
    return this.departmentService.selectOne({ id })
  }

  @ResolveField('staff', returns => [UserModel])
  async staff(@Parent() department: DepartmentModel) {
    const departmentId = department.id
    return this.userService.selectStaff(departmentId)
  }

  @ResolveField('children', returns => [DepartmentModel])
  async departmentChildren(@Parent() department: DepartmentModel): Promise<DepartmentModel[]> {
    const departmentId = department.id
    return this.departmentService.selectChildren(departmentId)
  }
}
