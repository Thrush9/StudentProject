/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './models/student.model';
import { StudentInput } from './models/student.input';

@Injectable()
export class StudentsService {

  constructor(@InjectModel('Student') private studentModel: Model<Student>) {
  }

  async saveStudent(student: StudentInput): Promise<Student> {
    //const newStudent = new this.studentModel({ firstName, lastName, email, rollId });
    const newStudent = new this.studentModel(student);
    let result;
    try {
      result = await newStudent.save();
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error);
    }
    return result;
  }

  async getStudents(): Promise<Student[]> {
    const students = await this.studentModel.find().exec();
    return students;
  }

  async getStudentById(id: string): Promise<Student> {
    let search;
    try {
      search = await this.studentModel.findById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    if (!search) {
      throw new NotFoundException('Could not Find Student');
    }
    return search;
  }

  async updateStudent(id: string, student: Student): Promise<Student> {
    const target = await this.getStudentById(id);
    const updated = await this.studentModel.findByIdAndUpdate(target.id, student, { new: true });
    return updated;
  }

  async deleteStudentById(id: string): Promise<boolean> {
    const target = await this.getStudentById(id);
    const deleted = await this.studentModel.deleteOne({ _id: target.id });
    return deleted.n === 1 ? true : false;
  }


}
