import { Field, Int } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class CommonEntity {
  @PrimaryGeneratedColumn({ comment: 'Primary generated column' })
  @Field(() => Int)
  ID: number;

  @CreateDateColumn({ comment: 'automated date created column' })
  @Field(() => Date)
  DateCreated: Date;

  @UpdateDateColumn({ comment: 'automated date updated column' })
  @Field(() => Date)
  DateUpdated: Date;
}
