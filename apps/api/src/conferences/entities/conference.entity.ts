import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JsonObject } from '../../common/interfaces/json-object.interface';
import { Meeting } from '../../meetings/entities/meeting.entity';

@Entity()
@ObjectType()
export class Conference {
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'The id of the conference' })
  id: string;

  @OneToOne(() => Meeting, (meeting) => meeting.conference)
  @JoinColumn()
  meeting: Promise<Meeting>;

  @Column({ nullable: true })
  @Field({ description: 'The id of the meeting associated with the conference' })
  meetingId: string;

  @Column('json', { nullable: true })
  providerProps?: JsonObject;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;

  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}
