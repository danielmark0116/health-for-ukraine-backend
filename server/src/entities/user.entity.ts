import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import { lowercase } from '../transformers/lowercase.transformer'

export type UserRole = 'superadmin' | 'admin' | 'user'
export type UserAccountProvider = 'internal' | 'google'

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  googleId: string

  @Column({ type: 'enum', enum: ['superadmin', 'admin', 'user'], default: 'user' })
  role: UserRole

  @Column({ type: 'enum', enum: ['internal', 'google'], default: 'internal' })
  provider: UserAccountProvider

  @Column()
  @IsNotEmpty({ message: 'The name is required' })
  @MinLength(3)
  @MaxLength(200)
  name: string

  @Column({ transformer: [lowercase] })
  @IsNotEmpty({ message: 'The email is required' })
  @IsEmail()
  email: string

  @Column({ select: false })
  @IsNotEmpty({ message: 'Password not hashed' })
  password_hash: string

  // timestamp and timestampz types will return Date, not string
  @Column({ nullable: true, type: 'timestamptz' })
  confirmedAt: Date | null

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date

  password?: string

  hideHashedPassword() {
    this.password_hash = ''
  }
}
