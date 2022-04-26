import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { constant } from './constant';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

dotenv.config();

export interface IGenerateToken {
  ID: number;
  Name: string;
  Email: string;
}

const hashPassword = (plainPassword: string) =>
  bcrypt.hash(plainPassword, constant.HASH_SALT_COUNT);

const comparePassword = (plainPassword: string, hasPassword: string) =>
  bcrypt.compare(plainPassword, hasPassword);

const generateToken = (dataObject: IGenerateToken) =>
  JWT.sign(dataObject, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

const decryptToken = async (Token: string) => {
  const token = Token.split(' ')[1];
  try {
    const decryptData = JWT.verify(token, process.env.JWT_SECRET);
    return decryptData;
  } catch (error) {
    // throw token expired error
    if (error.name === 'TokenExpiredError') {
      throw new BadRequestException(constant.TOKEN_EXPIRED);
    }
    console.log('Error in token decryption', error);
    throw new InternalServerErrorException(constant.TOKEN_MISSING);
  }
};

export { hashPassword, comparePassword, generateToken, decryptToken };
