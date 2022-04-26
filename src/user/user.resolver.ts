import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { JWTMiddleware } from 'src/auth/auth.service';
import { UserEntity } from 'src/entity/user';
import { CreateUser } from './dto/createUser';
import { findAllResponseDTO, FindAllUserData } from './dto/findAllResponseDTO';
import { JWTMiddlewareDTO } from './dto/middle-ware';
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
  ): Promise<{ Token: string }> {
    return this.userService.userLogin(Email, Password);
  }

  @UseGuards(new JWTMiddleware())
  @Query(() => findAllResponseDTO)
  async findAllUserData(@Context('user') user: JWTMiddlewareDTO): Promise<{
    CurrentUser: JWTMiddlewareDTO;
    AllUserData: FindAllUserData[];
  }> {
    const data = {
      CurrentUser: user,
      AllUserData: await this.userService.findAllUserData(user.ID),
    };
    return data;
  }
}
