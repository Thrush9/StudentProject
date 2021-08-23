/* eslint-disable prettier/prettier */
// export interface Group {
//   id: string;
//   name: string;
//   type: string;
//   limit: number;
//   students: string[];
// }

import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Group {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => [String], { nullable: true })
  students?: string[];
}
