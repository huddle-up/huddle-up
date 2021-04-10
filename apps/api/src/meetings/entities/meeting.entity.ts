import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Meeting {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The id of the meeting' })
  id: number;

  @Column()
  @Field(() => String, { description: 'The title of the meeting' })
  title: string;

  @Column('text', { nullable: true })
  @Field({ nullable: true, description: 'The description of the meeting' })
  description?: string;

  @Column()
  @Field(() => Date, { description: 'The start date of the meeting' })
  startDate: Date;

  @Column()
  @Field(() => Date, { description: 'The end date of the meeting' })
  endDate: Date;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;

  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}
