/* eslint-disable prettier/prettier */
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class GroupInput {

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  type: string;

  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => [String], { nullable: true })
  students?: string[];
}
