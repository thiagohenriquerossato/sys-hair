import { CreateCompanyDto } from './dto/createCompanyDto';
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
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateCompanyDto } from './dto/updateCompanyDto';

@ApiTags('companies')
@ApiBearerAuth('token')
@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('company')
  async createCompany(
    @Body()
    data: CreateCompanyDto,
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
    data: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyService.updateCompany({ where: { id }, data });
  }

  @Delete('company/:id')
  async deleteCompany(@Param('id') id: string): Promise<Company> {
    return this.companyService.deleteCompany({ id });
  }
}
