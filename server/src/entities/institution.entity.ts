import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator'
import { lowercase } from '../transformers/lowercase.transformer'

export type UserRole = 'superadmin' | 'admin' | 'user'
export type UserAccountProvider = 'internal' | 'google'

export const voivodeships = [
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
const professions = ['doctor', 'nurse', 'midwife', 'physio', 'paramedic'] as const
const specialities = [
  'dentist',
  'internist',
  'cardiologist',
  'neurologist',
  'pediatrician',
  'gynecologist',
  'surgeon',
  'oncologist',
  'hematologist',
  'orthopaedist',
  'psychiatrist',
] as const
const serviceTypes = ['phone', 'visit', 'on-site'] as const
const languages = ['pl', 'ua', 'en', 'de', 'ru'] as const

export type ServiceType = typeof serviceTypes[number]
export type Speciality = typeof specialities[number]
export type Profession = typeof professions[number]
export type Voivodehip = typeof voivodeships[number]
export type Language = typeof languages[number]

@Entity()
export class Institution {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'enum', enum: voivodeships, default: 'silesian' })
  @IsIn([...voivodeships])
  voivodeship: Voivodehip

  // DEPRECATED! USE PROFESSION
  @Column({ type: 'enum', enum: [...professions, 'dentist'], default: 'doctor', nullable: true })
  @IsOptional()
  professionOld: Profession

  @Column({ type: 'enum', enum: professions, default: 'doctor' })
  @IsIn([...professions])
  profession: Profession

  // DEPRECATED!
  @Column({ nullable: true })
  specialtyOld: string

  @Column({ type: 'enum', enum: specialities, nullable: true })
  @IsOptional()
  @IsIn([...specialities])
  speciality: Speciality

  // DEPRECATED!
  @Column({ type: 'enum', enum: serviceTypes, default: 'on-site', nullable: true })
  serviceTypeOld: ServiceType

  @Column({ type: 'enum', enum: serviceTypes, array: true, nullable: false, default: [] })
  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  serviceType: ServiceType[]

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

  // DEPRECATED!
  @Column({ nullable: true })
  languageInfo: string

  @Column({ type: 'enum', array: true, enum: languages, nullable: false, default: [] })
  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  languages: Language[]

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
