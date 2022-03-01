import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { IsBoolean, IsEmail, IsIn, IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import { lowercase } from '../transformers/lowercase.transformer'

export type UserRole = 'superadmin' | 'admin' | 'user'
export type UserAccountProvider = 'internal' | 'google'

const voivodeships = [
  'lower-silesian',
  'kuyavian-pomeranian',
  'lublin',
  'lubusz',
  'lodz',
  'lesser-poland',
  'masovian',
  'opole',
  'subcarpathian',
  'podklaskie',
  'pomeranian',
  'silesian',
  'holy-cross',
  'warmian-masurian',
  'greater-poland',
  'west-pomeranian',
] as const
const professions = ['doctor', 'dentist', 'nurse', 'midwife', 'physio', 'paramedic'] as const
const serviceTypes = ['phone', 'visit', 'on-site'] as const

export type ServiceType = typeof serviceTypes[number]
export type Profession = typeof professions[number]
export type Voivodehip = typeof voivodeships[number]

@Entity()
export class Institution {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'enum', enum: voivodeships, default: 'silesian' })
  @IsIn([...voivodeships])
  voivodeship: Voivodehip

  @Column({ type: 'enum', enum: professions, default: 'doctor' })
  @IsIn([...professions])
  profession: Profession

  @Column()
  @MinLength(1)
  @MaxLength(200)
  specialty: string

  @Column({ type: 'enum', enum: serviceTypes, default: 'on-site' })
  @IsIn([...serviceTypes])
  serviceType: ServiceType

  @Column()
  @IsNotEmpty({ message: 'The addressString is required' })
  @MinLength(1)
  @MaxLength(200)
  addressString: string

  @Column()
  @IsNotEmpty({ message: 'The hours field is required' })
  @MinLength(1)
  @MaxLength(20)
  hours: string

  @Column()
  @IsNotEmpty({ message: 'The city is required' })
  @MinLength(1)
  @MaxLength(200)
  city: string

  @Column()
  @IsNotEmpty({ message: 'The contactData field is required' })
  @MinLength(1)
  @MaxLength(200)
  contactData: string

  @Column({ type: 'bool', default: false })
  @IsBoolean()
  validated: boolean

  @Column()
  @IsNotEmpty({ message: 'The languageInfo field is required' })
  @MinLength(1)
  @MaxLength(200)
  languageInfo: string

  @Column()
  @IsNotEmpty({ message: 'The postCode is required' })
  @MinLength(5)
  @MaxLength(6)
  postCode: string

  @Column()
  @IsNotEmpty({ message: 'The name is required' })
  @MinLength(3)
  @MaxLength(200)
  name: string

  @Column()
  @IsNotEmpty({ message: 'The institution name is required' })
  @MinLength(3)
  @MaxLength(200)
  institutionName: string

  @Column({ transformer: [lowercase] })
  @IsNotEmpty({ message: 'The email is required' })
  @IsEmail()
  email: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date
}
