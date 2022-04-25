import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { CommonEntity } from './common';

@Entity({ name: 'User' })
@ObjectType()
export class UserEntity extends CommonEntity {
  @Column({ comment: 'User email address', nullable: false })
  @Field()
  Name: string;

  @Column({ comment: 'User email address', unique: true, nullable: false })
  @Field()
  Email: string;

  @Column({ comment: 'User email address', type: 'text', nullable: false })
  @Field()
  Password: string;
}
