import bcrypt from 'bcrypt';
import { constant } from './constant';

const hashPassword = async (plainPassword: string) =>
  bcrypt.hash(plainPassword, constant.HASH_SALT_COUNT);

export { hashPassword };
