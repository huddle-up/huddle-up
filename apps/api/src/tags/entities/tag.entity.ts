import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Meeting } from '../../meetings/entities/meeting.entity';

@Entity()
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'The id of the tag' })
  id: number;

  @Column({ unique: true })
  @Field({ description: 'The name of the tag' })
  name: string;

  @Column('bool', { default: false })
  @Field({ description: 'The flag indicating if predefined' })
  predefined: boolean;

  @ManyToMany(() => Meeting, (meeting) => meeting.tags)
  @Field(() => [Meeting], { nullable: true, description: 'The meetings with this tag' })
  meetings: Promise<Meeting[]>;

  @CreateDateColumn({ name: 'created_at' })
  'created_at': Date;

  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}
