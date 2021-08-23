/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Student } from './models/student.model';
import { StudentInput } from './models/student.input';
import { StudentsService } from './students.service';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) { }

  @Query(() => [Student], { name: 'students' })
  getAllStudents(): Promise<Student[]> {
    return this.studentsService.getStudents();
  }

  @Query(() => Student)
  getStudent(@Args('id') id: string): Promise<Student> {
    return this.studentsService.getStudentById(id);
  }

  @Mutation(() => Student)
  createStudent(@Args('studentInput') student: StudentInput): Promise<Student> {
    return this.studentsService.saveStudent(student);
  }

  @Mutation(() => Student)
  updateStudent(@Args('id') id: string, @Args('studentUpdate') student: StudentInput): Promise<Student> {
    return this.studentsService.updateStudent(id, { id, ...student });
  }

  @Mutation(() => Boolean)
  removeStudent(@Args('id') id: string): Promise<boolean> {
    const result = this.studentsService.deleteStudentById(id);
    return result;
  }
}
