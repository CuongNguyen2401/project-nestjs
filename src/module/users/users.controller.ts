import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { ApiResponse } from 'src/Exception/ApiResponse';

@ApiTags('users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get()
  async findAll(
    @Query('current') current: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('sort') sort: string = 'id', 
  ): Promise<ApiResponse<{ total: number; users: User[] }>> {
    const result = await this.usersService.findAll(current, pageSize, sort);
    return ApiResponse.success(result); 
  }
  

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

}
