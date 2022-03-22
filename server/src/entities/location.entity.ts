import { IsNotEmpty, IsOptional } from 'class-validator'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  @IsNotEmpty()
  locationExtId: string

  @Column({ nullable: false })
  @IsNotEmpty()
  title: string

  @Column({ nullable: false })
  @IsNotEmpty()
  language: string

  @Column({ nullable: false })
  @IsNotEmpty()
  resultType: string

  @Column({ nullable: true })
  @IsOptional()
  localityType?: string

  @Column({ nullable: false, type: 'decimal' })
  @IsNotEmpty()
  // because of `decimal` type, querying location will return this column as string
  lat: string

  @Column({ nullable: false, type: 'decimal' })
  @IsNotEmpty()
  // because of `decimal` type, querying location will return this column as string
  lng: string
}
