import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Meeting } from '../../meetings/entities/meeting.entity';
import { Participation } from '../../participations/entities/participation.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field({ description: 'The id of the user' })
  id: string;

  @Column('text', { nullable: false, unique: true })
  @Field({ description: 'The email of the user' })
  email: string;

  @Column({ nullable: true })
  @Field({ description: 'The name of the user' })
  name: string;

  @Column('text', { nullable: true })
  @Field({ nullable: true, description: 'The biography of the user' })
  biography?: string;

  @OneToMany(() => Meeting, (meeting) => meeting.host)
  @Field(() => [Meeting], { description: 'The meetings the user has hosted' })
  meetings: Promise<Meeting[]>;

  @OneToMany(() => Participation, (participation) => participation.user)
  @Field(() => [Participation], { description: 'The meetings the user is a participant of' })
  participations: Promise<Participation>[];

  @Field({ name: 'joinedAt', description: 'The join date of the user' })
  @CreateDateColumn({ name: 'created_at' })
  'created_at': Date;

  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;

  get joinedAt(): Date {
    return this.created_at;
  }
}
