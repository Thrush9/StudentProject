/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentsService } from 'src/students/students.service';
import { GroupsService } from './groups.service';
import { GroupInput } from './models/group.input';
import { Group } from './models/group.model';

@Resolver()
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService, private readonly studentsService: StudentsService) { }

  @Query(() => [Group], { name: 'groups' })
  getAllGroups(): Promise<Group[]> {
    return this.groupsService.getGroups();
  }

  @Query(() => Group)
  getGroup(@Args('id') id: string): Promise<Group> {
    return this.groupsService.getGroupById(id);
  }

  @Mutation(() => Group)
  createGroup(@Args('groupInput') group: GroupInput): Promise<Group> {
    return this.groupsService.saveGroup(group);
  }

  @Mutation(() => Group)
  updateGroup(@Args('id') id: string, @Args('groupUpdate') group: GroupInput): Promise<Group> {
    return this.groupsService.updateGroup(id, { id, ...group });
  }

  @Mutation(() => Boolean)
  removeGroup(@Args('id') id: string): Promise<boolean> {
    const result = this.groupsService.deleteGroupById(id);
    return result;
  }

  // @ResolveField(() => Student)
  // student(@Parent() group: Group) {
  //   return group.students.map(student => this.studentsService.getStudentById(student));
  // }

}
