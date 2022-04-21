import { Controller, Get } from '@nestjs/common';
import { State } from '@prisma/client';
import { CityService } from './city.service';

@Controller()
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('cities')
  async listStates(): Promise<State[]> {
    return this.cityService.cities();
  }
}
