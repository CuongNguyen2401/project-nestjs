import { Inject, Injectable } from '@nestjs/common';
import { AppException } from 'src/Exception/AppException';
import { ErrorCode } from 'src/Exception/ErrorCode';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from './../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refreshtoken.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findOne(signInDto.username);

    if (!user) {
      throw new AppException(ErrorCode.USER_NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(signInDto.password, user.hashPassword);

    if (!isPasswordValid) {
      throw new AppException(ErrorCode.INVALID_PASSWORD);
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    await this.refreshTokenRepository.save({ userId: user.id, refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }

  generateAccessToken(user: any): string {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  generateRefreshToken(user: any): string {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  async refreshToken(oldRefreshToken: string) {
    try {
      const decoded = this.jwtService.verify(oldRefreshToken);
      const user = await this.userService.findOne(decoded.username);

      if (!user) throw new AppException(ErrorCode.USER_NOT_FOUND);
      if (!this.isRefreshTokenValid(user.id, oldRefreshToken)) {
        throw new AppException(ErrorCode.UNAUTHENTICATED);
      }

      const newAccessToken = this.generateAccessToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      await this.refreshTokenRepository.update(
        { user: { id: user.id }, token: oldRefreshToken }, 
        { token: newRefreshToken } 
      );
      
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (e) {
      throw new AppException(ErrorCode.UNAUTHENTICATED);
    }
  }


  private async isRefreshTokenValid(userId: number, token: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { user: { id: userId }, token: token },
    });
    return !!refreshToken;
  }



  async createUser(createUserDto: CreateUserDto): Promise < User > {

      const user = await this.userService.findOne(createUserDto.userName);
      if(user) {
        throw new AppException(ErrorCode.USER_ALREADY_EXISTS);
      }

    if(createUserDto.password !== createUserDto.rePassword) {
      throw new AppException(ErrorCode.PASSWORD_MISMATCH);
    }


    const hasPassword = await this.userService.hashPassword(createUserDto.password);

    const newUser = new User();
    newUser.username = createUserDto.userName;
    newUser.hashPassword = hasPassword;
    return this.userService.create(newUser);
  }

}
