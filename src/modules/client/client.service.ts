import { PrismaService } from './../../prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Client, Prisma } from '@prisma/client';

type updateRequest = {
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
};

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

  async createClient(
    data: Prisma.ClientCreateInput,
    addressRequest: {
      logradouro: string;
      numero: string;
      bairro: string;
      cep: string;
    },
    cityRequest: string,
    stateRequest: string,
  ): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { email: data.email },
    });
    if (client) {
      throw new HttpException('User already existis!', HttpStatus.BAD_REQUEST);
    }
    const result = await this.prisma.client.create({
      data,
    });

    let city = await this.prisma.city.findUnique({
      where: {
        name: cityRequest,
      },
    });
    if (!city) {
      city = await this.prisma.city.create({
        data: {
          name: cityRequest,
        },
      });
    }
    let state = await this.prisma.state.findUnique({
      where: {
        name: stateRequest,
      },
    });
    if (!state) {
      state = await this.prisma.state.create({
        data: {
          name: stateRequest,
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
        city_id: city.id,
        state_id: state.id,
      },
    });

    return result;
  }

  async updateClient(params: {
    where: Prisma.ClientWhereUniqueInput;
    data: updateRequest;
  }): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: params.where,
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
    let city;
    if (params.data.city) {
      city = await this.prisma.city.findFirst({
        where: {
          name: {
            equals: params.data.city,
            mode: 'insensitive',
          },
        },
      });
      if (!city) {
        city = await this.prisma.city.create({
          data: {
            name: params.data.city.toUpperCase(),
          },
        });
      }
    }

    let state;
    if (params.data.state) {
      state = await this.prisma.state.findFirst({
        where: {
          name: {
            equals: params.data.state,
            mode: 'insensitive',
          },
        },
      });
      if (!state) {
        state = await this.prisma.state.create({
          data: {
            name: params.data.state.toUpperCase(),
          },
        });
      }
    }

    const address_id = client.address[0].id;
    if (params.data.clientAddress) {
      await this.prisma.address.update({
        where: {
          id: address_id,
        },
        data: {
          logradouro: params.data.clientAddress.logradouro,
          numero: params.data.clientAddress.numero,
          bairro: params.data.clientAddress.bairro,
          cep: params.data.clientAddress.cep,
          city_id: params.data.city && city.id,
          state_id: params.data.state && state.id,
        },
      });
    }

    return this.prisma.client.update({
      where: params.where,
      data: params.data.clientData,
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
