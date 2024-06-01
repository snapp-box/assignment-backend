import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commission } from './commissions.entity';
import { CommissionsService } from './commissions.service';
import { CommissionsController } from './commissions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Commission])],
  providers: [CommissionsService],
  exports: [TypeOrmModule, CommissionsService],
  controllers: [CommissionsController],
})
export class CommissionsModule {}
