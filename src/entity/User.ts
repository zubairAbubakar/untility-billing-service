import { type } from "os";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany} from "typeorm";
import { Transaction } from "./Transaction";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phoneNumber: string;

}
