import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Attendee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
