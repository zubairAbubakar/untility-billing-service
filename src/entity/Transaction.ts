import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity({ name: "transaction"})
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    dateCreated: Date;

    @Column({nullable: true})
    status: string;

    @Column()
    requestId: string;

    @Column()
    transactionType: string;

    @Column({nullable: true})
    token: string;

    @Column()
    userId: number;

    @Column({nullable: true})
    recipientPhoneNumber: string;

}