/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Body, Post, Put, Delete, Query } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from './models/group.model';

@Controller('api/groups')
export class GroupsController {

  constructor(private groupsService: GroupsService) {
  }

  @Post()
  addGroup(@Body() group: Group): Promise<Group> {
    const newGroup = this.groupsService.saveGroup(group);
    return newGroup;
  }

  @Get()
  getAllGroups(): Promise<Group[]> {
    const groupsList = this.groupsService.getGroups();
    return groupsList;
  }

  @Get('/:id')
  getSpecificGroup(@Param('id') id: string): Promise<Group> {
    const searchGroup = this.groupsService.getGroupById(id);
    return searchGroup;
  }

  @Put('/:id')
  updateGroup(@Param('id') id: string, @Body() group: Group): Promise<Group> {
    const updatedGroup = this.groupsService.updateGroup(id, group);
    return updatedGroup;
  }

  @Delete('/:id')
  deleteStudent(@Param('id') id: string): Promise<boolean> {
    const deleted = this.groupsService.deleteGroupById(id);
    return deleted;
  }

  @Post('/addStudent')
  addStudentToGroup(@Query('groupId') groupId: string, @Query('studentId') studentId: string): Promise<Group> {
    const group = this.groupsService.addStudentToGroup(groupId, studentId);
    return group;
  }

  @Post('/removeStudent')
  removeStudentFromGroup(@Query('groupId') groupId: string, @Query('studentId') studentId: string): Promise<Group> {
    const group = this.groupsService.removeStudentFromGroup(groupId, studentId);
    return group;
  }
}
