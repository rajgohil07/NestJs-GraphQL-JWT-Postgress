import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserEntity } from 'src/entity/user';
import { CreateUser } from './dto/createUser';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  createUser(
    @Args('UserCreateObject') userCreateObject: CreateUser,
  ): Promise<UserEntity> {
    return this.userService.createUser(userCreateObject);
  }
}
