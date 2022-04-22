import { Injectable } from '@nestjs/common';
import { State } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService) {}

  async states(): Promise<State[]> {
    return this.prisma.state.findMany();
  }
}
