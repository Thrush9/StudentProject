/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './models/student.schema';
import { StudentsResolver } from './students.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }])],
  controllers: [StudentsController],
  providers: [StudentsService, StudentsResolver],
  exports: [StudentsService]
})
export class StudentsModule { }
