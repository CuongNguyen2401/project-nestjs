import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "../enums/gender.enum";
import { Transform } from "class-transformer";
import { format } from "date-fns";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Status } from "../enums/status.enum";


@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    @Transform(({ value }) => format(new Date(value), 'dd-MM-yyyy HH:mm:ss.SSS'))
    createdAt: Date;

    @Column()
    createdBy: string;

    @CreateDateColumn()
    @Transform(({ value }) => format(new Date(value), 'dd-MM-yyyy HH:mm:ss.SSS'))
    modifiedAt: Date;

    @Column()
    modifiedBy: string;

    @Column()
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    @Column({ unique: true })
    username: string;

    @Column()
    hashPassword: string;

    @Column()
    role: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: 'Active',
        nullable: true
    })
    status: Status;

    @Column()
    age: number;

    @Column({
        type: 'enum',
        enum: Gender,
        default: 'Other',
        nullable: true
    })
    gender: Gender;


}
