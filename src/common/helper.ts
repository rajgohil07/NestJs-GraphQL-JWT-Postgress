import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { constant } from './constant';

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

export { hashPassword, comparePassword, generateToken };
