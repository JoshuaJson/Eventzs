import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsDateString } from "class-validator";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: "Name is required" })
  name!: string;

  @Column()
  @IsNotEmpty({ message: "Description is required" })
  description!: string;

  // Actualiza el tipo de columna para usar 'timestamp' en la base de datos y valida la fecha como una cadena en formato ISO 8601
  @Column({ type: 'timestamp' })
  @IsDateString({}, { message: "Start date must be a valid ISO 8601 date string" })
  startDate!: Date;

  @Column({ type: 'timestamp' })
  @IsDateString({}, { message: "End date must be a valid ISO 8601 date string" })
  endDate!: Date;

  @Column()
  @IsNotEmpty({ message: "Location is required" })
  location!: string;

  @Column('decimal', { precision: 10, scale: 7 })
  latitude!: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude!: number;
}
