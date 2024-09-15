import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsDate } from "class-validator";

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
  @IsDate({},)
  startDate: Date;

  @Column()
  @IsDate({},)
  endDate: Date;

  @Column()
  @IsNotEmpty({ message: "Location is required" })
  location!: string;

  @Column('decimal', { precision: 10, scale: 7 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude: number;
}