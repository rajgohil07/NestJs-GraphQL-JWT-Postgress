import { InjectRepository } from '@nestjs/typeorm';
import { constant } from 'src/common/constant';
import { UserEntity } from 'src/entity/user';
import { Repository } from 'typeorm';
import { CreateUser } from './dto/createUser';
import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  comparePassword,
  generateToken,
  hashPassword,
} from 'src/common/helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // user register functionality
  async createUser(createObj: CreateUser): Promise<UserEntity> {
    const { Name, Email, Password } = createObj;
    const lowerEmail = Email.toLowerCase();
    const findOneData = await this.userRepository.findOne({
      where: { Email: lowerEmail },
      select: ['Email'],
    });
    if (findOneData.Email) {
      throw new BadRequestException(constant.USER_ALREADY_EXIST);
    }
    const hashPasswordValue = await hashPassword(Password);
    const dataObject: CreateUser = {
      Name,
      Email: lowerEmail,
      Password: hashPasswordValue,
    };
    const createUserQuery = this.userRepository.create(dataObject);
    const saveUserData = await this.userRepository.save(createUserQuery);
    return saveUserData;
  }

  // user login functionality
  async userLogin(Email: string, Password: string): Promise<string> {
    const lowerEmail = Email.toLowerCase();
    const findUserData = await this.userRepository.findOne({
      where: {
        Email: lowerEmail,
      },
      select: ['ID', 'Email', 'Name', 'Password'],
    });
    if (!findUserData) {
      throw new NotFoundException(constant.EMAIL_NOT_FOUND);
    }
    const IsValidPassword = await comparePassword(
      Password,
      findUserData.Password,
    );
    if (!IsValidPassword) {
      throw new BadGatewayException(constant.PROVIDED_WRONG_PASSWORD);
    }
    delete findUserData.Password;
    return generateToken(findUserData);
  }
}
