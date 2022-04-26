import { Field, Int, ObjectType } from '@nestjs/graphql';
import { JWTMiddlewareDTO } from './middle-ware';

@ObjectType()
export class FindAllUserData {
  @Field(() => Int)
  ID: number;

  @Field()
  Name: string;

  @Field()
  Email: string;
}

@ObjectType()
export class findAllResponseDTO {
  @Field(() => [FindAllUserData])
  AllUserData: FindAllUserData[];

  @Field(() => JWTMiddlewareDTO)
  CurrentUser: JWTMiddlewareDTO;
}
