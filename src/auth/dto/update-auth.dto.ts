import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './signIn.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
