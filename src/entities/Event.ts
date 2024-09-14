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

  @Column()
  @IsDateString({}, { message: "Date must be a valid date" })
  date!: Date;

  @Column()
  @IsNotEmpty({ message: "Location is required" })
  location!: string;
}