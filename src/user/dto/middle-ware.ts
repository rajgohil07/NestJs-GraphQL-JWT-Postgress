import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JWTMiddlewareDTO {
  @Field(() => Int)
  ID: number;

  @Field()
  Name: string;

  @Field()
  Email: string;
}
