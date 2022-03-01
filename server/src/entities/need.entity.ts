import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import { lowercase } from '../transformers/lowercase.transformer'

@Entity()
export class Need {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @MinLength(1)
  @MaxLength(200)
  needTitle: string

  @Column()
  @MinLength(1)
  @MaxLength(200)
  needDescription: string

  @Column()
  @MinLength(1)
  @MaxLength(400)
  contact: string

  @Column()
  @MinLength(1)
  @MaxLength(400)
  city: string

  @Column({ transformer: [lowercase] })
  @IsNotEmpty({ message: 'The email is required' })
  @IsEmail()
  email: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date
}
