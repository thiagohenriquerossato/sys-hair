import { Injectable } from '@nestjs/common';
import { City } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async cities(): Promise<City[]> {
    return this.prisma.city.findMany();
  }
}
