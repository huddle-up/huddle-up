import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Meeting } from '../../meetings/entities/meeting.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
@ObjectType()
export class Participation {
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'The id of the participation' })
  id: string;

  @ManyToOne(() => User, (user) => user.participations, { onDelete: 'CASCADE' })
  @Field(() => User, { description: 'The user associated with the participation' })
  user: Promise<User>;

  @Column()
  userId: string;

  @ManyToOne(() => Meeting, (meeting) => meeting.participations, { onDelete: 'CASCADE' })
  @Field(() => Meeting, { description: 'The meeting associated with the participation' })
  meeting: Promise<Meeting>;

  @Column()
  meetingId: string;

  @CreateDateColumn({ name: 'created_at' })
  'created_at': Date;

  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}
