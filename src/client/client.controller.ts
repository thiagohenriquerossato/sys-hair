import { CreateClientDto } from './dto/createClientDto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Client } from '@prisma/client';
import { ClientService } from './client.service';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UpdateClientDto } from './dto/updateClient';

@ApiTags('clients')
@ApiBearerAuth('token')
@Controller()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('client')
  async createClient(
    @Body()
    data: CreateClientDto,
  ): Promise<Client | Response> {
    return this.clientService.createClient(data);
  }

  @Get('clients')
  @ApiQuery({
    name: 'name',
    description: 'Inserir nome - Pode ser parcial - Opcional.',
    required: false,
    explode: false,
    type: String,
    example: 'fula',
  })
  async getClients(@Query() query: { name: string }): Promise<Client[]> {
    return this.clientService.clients(
      query.name
        ? {
            where: {
              name: {
                contains: query.name,
                mode: 'insensitive',
              },
            },
            orderBy: { name: 'asc' },
          }
        : { orderBy: { name: 'asc' } },
    );
  }

  @Put('client/:id')
  async updateClient(
    @Param('id') id: string,
    @Body()
    data: UpdateClientDto,
  ): Promise<Client> {
    const result = await this.clientService.updateClient({
      where: { id: id },
      data,
    });
    return result;
  }

  @Delete('client/:id')
  async deleteUser(@Param('id') id: string) {
    return this.clientService.deleteClient({ id });
  }
}
