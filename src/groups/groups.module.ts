/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

import { MongooseModule } from '@nestjs/mongoose';
import { GroupSchema } from './models/group.schema';
import { StudentsModule } from 'src/students/students.module';
import { GroupsResolver } from './groups.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
    StudentsModule
  ],
  controllers: [GroupsController],
  providers: [GroupsService, GroupsResolver],
})
export class GroupsModule { }
