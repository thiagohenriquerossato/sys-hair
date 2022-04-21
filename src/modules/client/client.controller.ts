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

@Controller()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('client')
  async createClient(
    @Body()
    data: {
      name: string;
      email: string;
      cpf: string;
      phone: string;
      logradouro: string;
      numero: string;
      bairro: string;
      cep: string;
      city: string;
      state: string;
    },
  ): Promise<Client | Response> {
    const clientData = {
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      phone: data.phone,
    };
    const addressRequest = {
      logradouro: data.logradouro,
      numero: data.numero,
      bairro: data.bairro,
      cep: data.cep,
    };
    const { city, state } = data;
    return this.clientService.createClient(
      clientData,
      addressRequest,
      city,
      state,
    );
  }

  @Get('clients')
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
    data: {
      clientData?: {
        name?: string;
        email?: string;
        cpf?: string;
        phone?: string;
      };
      clientAddress?: {
        logradouro?: string;
        numero?: string;
        bairro?: string;
        cep?: string;
      };
      city?: string;
      state?: string;
    },
  ): Promise<Client> {
    const { clientData, clientAddress, city, state } = data;
    const result = await this.clientService.updateClient({
      where: { id: id },
      data: { clientData, clientAddress, city, state },
    });
    return result;
  }

  @Delete('client/:id')
  async deleteUser(@Param('id') id: string) {
    return this.clientService.deleteClient({ id });
  }
}
