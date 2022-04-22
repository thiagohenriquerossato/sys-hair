import { CreateCompanyDto } from './dto/createCompanyDto';
import { Company, Prisma } from '@prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCompanyDto } from './dto/updateCompanyDto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async company(
    companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput,
  ): Promise<Company | null> {
    return this.prisma.company.findUnique({
      where: companyWhereUniqueInput,
    });
  }

  async companies(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CompanyWhereUniqueInput;
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput;
  }): Promise<Company[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.company.findMany({
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
        products: {
          select: {
            id: true,
            price: true,
            type: true,
          },
        },
      },
    });
  }

  async createCompany(data: CreateCompanyDto): Promise<Company> {
    const company = {
      name: data.name,
      email: data.email,
      cnpj: data.cnpj,
      phone: data.phone,
    };
    const address = {
      logradouro: data.logradouro,
      numero: data.numero,
      bairro: data.bairro,
      cep: data.cep,
    };
    const { city, state } = data;
    const companyR = await this.prisma.company.findUnique({
      where: { cnpj: company.cnpj },
    });
    if (companyR) {
      throw new HttpException(
        'Company already existis!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.prisma.company.create({
      data: company,
      include: {
        address: {
          select: {
            logradouro: true,
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

    let cityR = await this.prisma.city.findUnique({
      where: {
        name: city.toUpperCase(),
      },
    });
    if (!cityR) {
      cityR = await this.prisma.city.create({
        data: {
          name: city.toUpperCase(),
        },
      });
    }
    let stateR = await this.prisma.state.findUnique({
      where: {
        name: state.toUpperCase(),
      },
    });
    if (!stateR) {
      stateR = await this.prisma.state.create({
        data: {
          name: state.toUpperCase(),
        },
      });
    }
    await this.prisma.address.create({
      data: {
        logradouro: address.logradouro,
        numero: address.numero,
        bairro: address.bairro,
        cep: address.cep,
        company_id: result.id,
        city_id: cityR.id,
        state_id: stateR.id,
      },
    });

    return result;
  }

  async updateCompany(params: {
    where: Prisma.CompanyWhereUniqueInput;
    data: UpdateCompanyDto;
  }): Promise<Company> {
    const { where, data } = params;
    const company = {
      name: data.name,
      cnpj: data.cnpj,
      phone: data.phone,
    };
    const address = {
      logradouro: data.logradouro,
      numero: data.numero,
      bairro: data.bairro,
      cep: data.cep,
    };
    const { city, state } = data;
    const companyR = await this.prisma.company.findUnique({
      where,
      include: {
        address: true,
      },
    });
    if (!companyR) {
      throw new HttpException(
        'Company does not existis!',
        HttpStatus.BAD_REQUEST,
      );
    }
    let cityR;
    if (city) {
      cityR = await this.prisma.city.findUnique({
        where: {
          name: city.toUpperCase(),
        },
      });
      if (!cityR) {
        cityR = await this.prisma.city.create({
          data: {
            name: city.toUpperCase(),
          },
        });
      }
    }

    let stateR;
    if (state) {
      stateR = await this.prisma.state.findFirst({
        where: {
          name: state.toUpperCase(),
        },
      });
      if (!stateR) {
        stateR = await this.prisma.state.create({
          data: {
            name: state.toUpperCase(),
          },
        });
      }
    }

    const address_id = companyR.address[0].id;

    if (address) {
      await this.prisma.address.update({
        where: {
          id: address_id,
        },
        data: {
          logradouro: address.logradouro,
          numero: address.numero,
          bairro: address.bairro,
          cep: address.cep,
          city_id: city && cityR.id,
          state_id: state && stateR.id,
        },
      });
    }

    return this.prisma.company.update({
      where: params.where,
      data: company,
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

  async deleteCompany(where: Prisma.CompanyWhereUniqueInput): Promise<Company> {
    const company = await this.prisma.company.findUnique({ where });
    if (!company) {
      throw new HttpException(
        'Company does not existis!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.company.delete({
      where,
    });
  }
}
