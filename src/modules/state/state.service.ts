import { PrismaService } from './../../prisma.service';
import { Injectable } from '@nestjs/common';
import { State } from '@prisma/client';

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService) {}

  async states(): Promise<State[]> {
    return this.prisma.state.findMany();
  }
}
