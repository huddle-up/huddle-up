import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Meeting } from 'src/meetings/entities/meeting.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @OneToMany(() => Meeting, (meeting) => meeting.user)
  @Field(() => [Meeting], { description: 'The meetings of the user' })
  meetings: Promise<Meeting[]>;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;

  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;

  get joinedAt(): Date {
    return this.created_at;
  }
}
