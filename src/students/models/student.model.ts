/* eslint-disable prettier/prettier */
import { Field, Int, ObjectType } from '@nestjs/graphql';

// export interface Student {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   rollId: number;
// }

@ObjectType()
export class Student {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field(() => Int)
  rollId: number;
}
