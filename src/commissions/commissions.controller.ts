import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Commission } from './commissions.entity';
import { CommissionsService } from './commissions.service';
import { CommissionRequestDto } from 'src/auth/dtos/commission-request.dto';
import { UpdateResponseDto } from 'src/auth/dtos/update-response.dto';

@Controller('commissions')
export class CommissionsController {
  constructor(private commissionsService: CommissionsService) {}

  @Get()
  async findAll(): Promise<Commission[]> {
    return await this.commissionsService.findAll();
  }

  @Post()
  async create(@Body() body: CommissionRequestDto): Promise<Commission | null> {
    return await this.commissionsService.create(body);
  }

  @Post('update')
  async update(@Body() body: CommissionRequestDto): Promise<UpdateResponseDto> {
    const response = await this.commissionsService.update(body);
    if (response.affected > 0) {
      return {
        done: true,
      };
    }
    return {
      done: false,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<UpdateResponseDto> {
    const response = await this.commissionsService.remove(id);
    if (response.affected > 0) {
      return { done: true };
    }
    return { done: false };
  }

  @Post('batch')
  async createBatch(
    @Body() body: CommissionRequestDto[],
  ): Promise<Commission | null> {
    return await this.commissionsService.createBatch(body);
  }
}
