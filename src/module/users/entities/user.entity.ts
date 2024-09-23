import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "../enums/gender.enum";
import { Transform } from "class-transformer";
import { format } from "date-fns";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Status } from "../enums/status.enum";
import { RefreshToken } from "src/auth/entities/refreshtoken.entity";


@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn()
    @Transform(({ value }) => format(new Date(value), 'dd-MM-yyyy HH:mm:ss.SSS'))
    createdAt?: Date;

    @Column({
        default: 'NotInsertDirectly:)))',
        nullable: true
    })
    createdBy?: string;

    @CreateDateColumn()
    @Transform(({ value }) => format(new Date(value), 'dd-MM-yyyy HH:mm:ss.SSS'))
    modifiedAt?: Date;

    @Column({
        default: 'NotInsertDirectly:)))',
        nullable: true
    })
    modifiedBy?: string;

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true })
    @IsEmail()
    email?: string;

    @Column({ nullable: true })
    @IsNotEmpty()
    @Column({ unique: true })
    username?: string;

    @Column({ nullable: true })
    hashPassword?: string;

    @Column({ nullable: true })
    role?: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: 'Active',
        nullable: true
    })
    status?: Status;

    @Column({ nullable: true })
    age?: number;

    @Column({
        type: 'enum',
        enum: Gender,
        default: 'Other',
        nullable: true
    })
    gender?: Gender;

    @OneToMany(() => RefreshToken, refreshToken => refreshToken.user)
    refreshTokens?: RefreshToken[];

}
