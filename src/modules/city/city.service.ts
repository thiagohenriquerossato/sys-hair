import { PrismaService } from './../../prisma.service';
import { Injectable } from '@nestjs/common';
import { City } from '@prisma/client';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async cities(): Promise<City[]> {
    return this.prisma.city.findMany();
  }
}
