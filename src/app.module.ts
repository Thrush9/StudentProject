/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { StudentsModule } from './students/students.module';
import { GroupsModule } from './groups/groups.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { MONGO_URI } from './config/Keys';

@Module({
  imports: [
    StudentsModule,
    GroupsModule,
    MongooseModule.forRoot(MONGO_URI),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
