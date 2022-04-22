import { CreateClientDto } from './dto/createClientDto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Client, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateClientDto } from './dto/updateClient';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async client(
    clientWhereUniqueInput: Prisma.ClientWhereUniqueInput,
  ): Promise<Client | null> {
    return this.prisma.client.findUnique({
      where: clientWhereUniqueInput,
    });
  }

  async clients(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ClientWhereUniqueInput;
    where?: Prisma.ClientWhereInput;
    orderBy?: Prisma.ClientOrderByWithRelationInput;
  }): Promise<Client[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.client.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        address: {
          select: {
            logradouro: true,
            numero: true,
            bairro: true,
            cep: true,
            city: {
              select: {
                name: true,
              },
            },
            state: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async createClient(data: CreateClientDto): Promise<Client> {
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
    const client = await this.prisma.client.findUnique({
      where: { email: data.email },
    });
    if (client) {
      throw new HttpException('User already existis!', HttpStatus.BAD_REQUEST);
    }
    const result = await this.prisma.client.create({
      data: {
        name: clientData.name,
        cpf: clientData.cpf,
        email: clientData.email,
        phone: clientData.phone,
      },
    });

    let cityResult = await this.prisma.city.findUnique({
      where: {
        name: city.toUpperCase(),
      },
    });
    if (!cityResult) {
      cityResult = await this.prisma.city.create({
        data: {
          name: city.toUpperCase(),
        },
      });
    }
    let stateResult = await this.prisma.state.findUnique({
      where: {
        name: state.toUpperCase(),
      },
    });
    if (!stateResult) {
      stateResult = await this.prisma.state.create({
        data: {
          name: state.toUpperCase(),
        },
      });
    }
    await this.prisma.address.create({
      data: {
        logradouro: addressRequest.logradouro,
        numero: addressRequest.numero,
        bairro: addressRequest.bairro,
        cep: addressRequest.cep,
        client_id: result.id,
        city_id: cityResult.id,
        state_id: stateResult.id,
      },
    });

    return result;
  }

  async updateClient(params: {
    where: Prisma.ClientWhereUniqueInput;
    data: UpdateClientDto;
  }): Promise<Client> {
    const { where, data } = params;
    const clientData = {
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      phone: data.phone,
    };
    const clientAddress = {
      logradouro: data.logradouro,
      numero: data.numero,
      bairro: data.bairro,
      cep: data.cep,
    };
    const { city, state } = data;
    const client = await this.prisma.client.findUnique({
      where: where,
      include: {
        address: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!client) {
      throw new HttpException(
        'Client does not existis!',
        HttpStatus.BAD_REQUEST,
      );
    }
    let cityResult;
    if (data.city) {
      cityResult = await this.prisma.city.findFirst({
        where: {
          name: {
            equals: data.city,
            mode: 'insensitive',
          },
        },
      });
      if (!cityResult) {
        cityResult = await this.prisma.city.create({
          data: {
            name: data.city.toUpperCase(),
          },
        });
      }
    }

    let stateResult;
    if (data.state) {
      stateResult = await this.prisma.state.findFirst({
        where: {
          name: {
            equals: data.state,
            mode: 'insensitive',
          },
        },
      });
      if (!stateResult) {
        stateResult = await this.prisma.state.create({
          data: {
            name: data.state.toUpperCase(),
          },
        });
      }
    }

    const address_id = client.address[0].id;
    if (clientAddress) {
      await this.prisma.address.update({
        where: {
          id: address_id,
        },
        data: {
          logradouro: clientAddress.logradouro,
          numero: clientAddress.numero,
          bairro: clientAddress.bairro,
          cep: clientAddress.cep,
          city_id: city && cityResult.id,
          state_id: state && stateResult.id,
        },
      });
    }

    return this.prisma.client.update({
      where: where,
      data: clientData,
      include: {
        address: {
          select: {
            logradouro: true,
            numero: true,
            bairro: true,
            cep: true,
            city: {
              select: {
                name: true,
              },
            },
            state: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async deleteClient(where: Prisma.ClientWhereUniqueInput): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where,
    });
    if (!client) {
      throw new HttpException(
        'Client does not existis!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.prisma.client.delete({
      where,
    });
  }
}
