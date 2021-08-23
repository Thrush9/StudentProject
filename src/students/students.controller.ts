/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { Student } from './models/student.model';
import { StudentsService } from './students.service';

@Controller('api/students')
export class StudentsController {

  constructor(private studentsService: StudentsService) {
  }

  @Post()
  async addStudent(@Body() student: Student): Promise<Student> {
    const newStudent = await this.studentsService.saveStudent(student);
    return newStudent;
  }

  @Get()
  async getAllStudents(): Promise<Student[]> {
    const studentsList = await this.studentsService.getStudents();
    return studentsList;
  }

  @Get('/:id')
  async getSpecificStudent(@Param('id') id: string): Promise<Student> {
    const searchStudent = await this.studentsService.getStudentById(id);
    return searchStudent;
  }

  @Put('/:id')
  async updateStudent(@Param('id') id: string, @Body() student: Student): Promise<Student> {
    const updatedStudent = await this.studentsService.updateStudent(id, student);
    return updatedStudent;
  }

  @Delete('/:id')
  async deleteStudent(@Param('id') id: string): Promise<boolean> {
    const searchStudent = await this.studentsService.deleteStudentById(id);
    return searchStudent;
  }

}
