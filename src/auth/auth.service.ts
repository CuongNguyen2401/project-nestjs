import { Injectable } from '@nestjs/common';
import { AppException } from 'src/Exception/AppException';
import { ErrorCode } from 'src/Exception/ErrorCode';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findOne(signInDto.username);

    if (!user) {
      return new AppException(ErrorCode.USER_NOT_FOUND);
    }
    if(!bcrypt.compare(signInDto.password, user.hashPassword)) {
      return new AppException(ErrorCode.INVALID_PASSWORD);
    }

    const payload = { username: signInDto.username, sub: user.id }; 
    const token = this.jwtService.sign(payload); 

    return {
        accessToken: token,
        refreshToken: token
    };


  }



  async createUser(createUserDto: CreateUserDto): Promise<User> {

    const user = await this.userService.findOne(createUserDto.userName);
    if (user) {
      throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
    }

    if (createUserDto.password !== createUserDto.rePassword) {
      throw new AppException(ErrorCode.PASSWORD_MISMATCH);
    }


    const hasPassword = await this.userService.hashPassword(createUserDto.password);

    const newUser = new User();
    newUser.username = createUserDto.userName;
    newUser.hashPassword = hasPassword;
    return this.usersRepository.save(createUserDto);
  }

}
