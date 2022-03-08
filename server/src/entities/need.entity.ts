import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import { lowercase } from '../transformers/lowercase.transformer'

@Entity()
export class Need {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  title: string

  @Column()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  description: string

  @Column()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(400)
  contact: string

  @Column()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(400)
  city: string

  @Column({ transformer: [lowercase] })
  @IsNotEmpty({ message: 'The email is required' })
  @IsEmail()
  email: string

  @Column({ nullable: true })
  lat: string

  @Column({ nullable: true })
  long: string

  @Column({ nullable: true })
  postedBy: string

  @Column({ nullable: true })
  updatedBy: string

  @Column({ type: 'integer' })
  @IsNotEmpty()
  urgency: number

  @Column()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(400)
  address: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date
}
