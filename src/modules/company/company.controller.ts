import { Company } from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';

type CompanyData = {
  company: {
    name: string;
    phone: string;
    cnpj: string;
    user_id: string;
  };
  address: {
    logradouro: string;
    numero: string;
    bairro: string;
    cep: string;
  };
  city: string;
  state: string;
};
type CompanyUpdateData = {
  company?: {
    name?: string;
    phone?: string;
    cnpj?: string;
    user_id?: string;
  };
  address?: {
    logradouro?: string;
    numero?: string;
    bairro?: string;
    cep?: string;
  };
  city?: string;
  state?: string;
};

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('company')
  async createCompany(
    @Body()
    data: CompanyData,
  ): Promise<Company> {
    return this.companyService.createCompany(data);
  }

  @Get('companies')
  async getCompanies(): Promise<Company[]> {
    return this.companyService.companies({ orderBy: { name: 'asc' } });
  }

  @Put('company/:id')
  async updateCompany(
    @Param('id') id: string,
    @Body()
    data: CompanyUpdateData,
  ): Promise<Company> {
    return this.companyService.updateCompany({ where: { id }, data });
  }

  @Delete('company/:id')
  async deleteCompany(@Param('id') id: string): Promise<Company> {
    return this.companyService.deleteCompany({ id });
  }
}
