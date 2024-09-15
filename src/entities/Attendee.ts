import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Event } from './Event';
@Entity()
export class Attendee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty({ message: "Name is required" })
  name!: string;

  @Column()
  @IsEmail({}, { message: "Email must be a valid email address" })
  email!: string;

  @ManyToOne(() => Event, (event) => event.id)
  event: Event;

  @Column({ type: 'timestamp' })
  attendanceDate: Date;
}