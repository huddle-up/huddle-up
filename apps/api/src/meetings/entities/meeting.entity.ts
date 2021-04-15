import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'The id of the meeting' })
  id: string;

  @Column()
  @Field({ description: 'The title of the meeting' })
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

  @ManyToOne(() => User, (user) => user.meetings)
  @Field(() => User, { description: 'The hoster of the meeting' })
  user: Promise<User>;

  @Column()
  userId: string;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;

  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}
