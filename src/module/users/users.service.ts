import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findAll(current: number, pageSize: number, sort: string): Promise<{ total: number; users: User[] }> {
    const [users, total] = await this.usersRepository.findAndCount({
      skip: (current - 1) * pageSize,
      take: pageSize,
      order: {
        [sort]: 'ASC', 
      },
    });
  
    return { total, users }; 
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
