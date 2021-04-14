import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class AuthUser {
  /**
   * The id provided by the issuer
   */
  @PrimaryColumn()
  sub: string;

  /**
   * The issuer identifier
   */
  @PrimaryColumn()
  issuer: string;

  /**
   * The email provided by the issuer
   */
  @Column({ unique: true })
  email: string;

  /**
   * The user associated with this AuthUser
   */
  @OneToOne(() => User)
  @JoinColumn()
  user: Promise<User>;

  @Column()
  userId: string;

  @CreateDateColumn({ name: 'created_at' }) 'created_at': Date;

  @UpdateDateColumn({ name: 'updated_at' }) 'updated_at': Date;
}
