import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserEntity } from 'src/entity/user';
import { CreateUser } from './dto/createUser';
import { Token } from './dto/token';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // user register functionality
  @Mutation(() => UserEntity)
  createUser(
    @Args('UserCreateObject') userCreateObject: CreateUser,
  ): Promise<UserEntity> {
    return this.userService.createUser(userCreateObject);
  }

  // user login functionality
  @Query(() => Token)
  userLogin(
    @Args('Email') Email: string,
    @Args('Password') Password: string,
  ): Promise<string> {
    return this.userService.userLogin(Email, Password);
  }

  @Query(() => [UserEntity])
  findAllUserData(): Promise<UserEntity[]> {
    return this.userService.findAllUserData();
  }
}
