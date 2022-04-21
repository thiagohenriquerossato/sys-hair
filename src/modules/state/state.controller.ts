import { StateService } from './state.service';
import { Controller, Get } from '@nestjs/common';
import { State } from '@prisma/client';

@Controller()
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get('states')
  async listStates(): Promise<State[]> {
    return this.stateService.states();
  }
}
