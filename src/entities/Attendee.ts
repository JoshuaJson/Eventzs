import { Entity, PrimaryGeneratedColumn, Column, ManyToOne ,JoinColumn} from "typeorm";
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
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @Column({ type: 'timestamp' })
  attendanceDate: Date;
}