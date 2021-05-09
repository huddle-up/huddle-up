import { ObjectType, Field } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from '../../tags/entities/tag.entity';
import { Conference } from '../../conferences/entities/conference.entity';
import { User } from '../../users/entities/user.entity';

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
  @Field(() => User, { name: 'host', description: 'The hoster of the meeting' })
  host: Promise<User>;

  @Column()
  hostId: string;

  @OneToOne(() => Conference, (conference) => conference.meeting)
  @Field(() => Conference, { description: 'The conference associated with the meeting', nullable: true })
  conference: Promise<Conference | null>;

  @ManyToMany(() => Tag, (tag) => tag.meetings)
  @JoinTable()
  @Field(() => [Tag], { nullable: true, description: 'The tags of the meeting' })
  tags?: Promise<Tag[]>;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date, { description: 'The date from which the conference can be created' })
  prepareDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  'created_at': Date;

  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}
