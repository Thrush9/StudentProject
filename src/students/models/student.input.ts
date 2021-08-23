/* eslint-disable prettier/prettier */
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class StudentInput {

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  email: string;

  @Field(() => Int, { nullable: true })
  rollId: number;
}
