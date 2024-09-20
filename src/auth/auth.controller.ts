import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from 'src/Exception/ApiResponse';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-in')
  async logIn(@Body() createAuthDto: SignInDto): Promise<ApiResponse<any>> {
    await this.authService.signIn(createAuthDto);
    return ApiResponse.empty();
  }

  @Post('sign-up')
  async createUser(@Body() createUserDto: CreateUserDto):Promise<ApiResponse<any>> {
    await this.authService.createUser(createUserDto);
    return ApiResponse.empty();
  }

}
