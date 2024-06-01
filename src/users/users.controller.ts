import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UpdateUserRequestDto } from 'src/auth/dtos/update-user-request.dto';
import { UpdateResponseDto } from 'src/auth/dtos/update-response.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  //   @Public()
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.finds();
  }

  @Post('update')
  async update(@Body() body: UpdateUserRequestDto): Promise<UpdateResponseDto> {
    const response = await this.usersService.update(body.id, body);
    return {
      done: response.affected > 0,
    };
  }
}
