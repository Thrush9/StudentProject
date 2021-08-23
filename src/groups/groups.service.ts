/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentsService } from 'src/students/students.service';
import { Group } from './models/group.model';
import { GroupInput } from './models/group.input';

@Injectable()
export class GroupsService {

  constructor(@InjectModel('Group') private groupModel: Model<Group>,
    private studentsService: StudentsService) {
  }

  async saveGroup(group: GroupInput): Promise<Group> {
    const newGroup = new this.groupModel(group);
    let result;
    try {
      result = await newGroup.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
    return result;
  }

  async getGroups(): Promise<Group[]> {
    const groups = await this.groupModel.find().exec();
    return groups;
  }

  async getGroupById(id: string): Promise<Group> {
    let search;
    try {
      search = await this.groupModel.findOne({ _id: id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    if (!search) {
      throw new NotFoundException('Could not Find Student');
    }
    return search;
  }

  async updateGroup(id: string, group: Group): Promise<Group> {
    const target = await this.getGroupById(id);
    const updated = await this.groupModel.findByIdAndUpdate(target.id, group, { new: true });
    return updated;
  }

  async deleteGroupById(id: string): Promise<boolean> {
    const target = await this.getGroupById(id);
    const deleted = await this.groupModel.deleteOne({ _id: target.id });
    return deleted.n === 1 ? true : false;
  }

  async addStudentToGroup(groupId: string, studentId: string): Promise<Group> {
    const group = await this.groupModel.findOne({ _id: groupId });
    const filtered = group.students.filter(stu => stu.toString() === studentId);
    if (filtered.length > 0) {
      throw new BadRequestException("Student Already Exists");
    } else {
      const student = await this.studentsService.getStudentById(studentId);
      group.students.push(student.id);
    }
    const updated = await group.save();
    return updated;
  }

  async removeStudentFromGroup(groupId: string, studentId: string): Promise<Group> {
    const group = await this.groupModel.findOne({ _id: groupId });
    const filtered = group.students.filter(stu => stu.toString() === studentId);
    if (filtered.length <= 0) {
      throw new BadRequestException("Student Doesn't Exists");
    } else {
      const student = await this.studentsService.getStudentById(studentId);
      const index = group.students.findIndex(stu => stu.toString() === student.id.toString());
      group.students.splice(index, 1);
    }
    const updated = await group.save();
    return updated;
  }
}
