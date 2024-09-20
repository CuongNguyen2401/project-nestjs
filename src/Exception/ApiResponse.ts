import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ApiResponse<T> {
  @ApiProperty({ default: 1000 })
  @Expose()
  code: number = 1000;

  @ApiProperty()
  @Expose()
  message: string;

  @ApiProperty({ required: false })
  @Expose()
  result?: T;

  constructor(partial: Partial<ApiResponse<T>>) {
    Object.assign(this, partial);
  }

  static success<T>(result: T): ApiResponse<T> {
    return new ApiResponse<T>({
      code: 1000,
      message: 'SUCCESS',
      result,
    });
  }

  static empty<T>(): ApiResponse<T> {
    return ApiResponse.success<T>(null);
  }
}