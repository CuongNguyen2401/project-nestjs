import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const randomPassword = password;
    return bcrypt.hash(randomPassword, saltOrRounds);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }
}
