import { CityService } from './city.service';
import { CityController } from './city.controller';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],

  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
