import { ProductService } from './product.service';
import { Product, Prisma } from '@prisma/client';
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
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductDto } from './dto/updateProduct';

@ApiTags('products')
@ApiBearerAuth('token')
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('product/:company_id')
  async createProduct(
    @Param('company_id') company_id: string,
    @Body()
    data: CreateProductDto,
  ): Promise<Product> {
    return this.productService.createProduct(data, company_id);
  }

  @Get('products')
  @ApiQuery({
    name: 'company_id',
    description: 'Id do salão - Opcional.',
    required: false,
    explode: false,
    type: String,
    example: 'uuid',
  })
  async getProducts(
    @Query() company_id: Prisma.ProductWhereInput,
  ): Promise<Product[]> {
    return this.productService.products({
      where: company_id,
      orderBy: {
        type: 'asc',
      },
    });
  }

  @Put('product/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body()
    data: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct({ where: { id }, data });
  }

  @Delete('product/:company_id/:product_id')
  async deleteProductCompany(
    @Param('company_id') company_id: string,
    @Param('product_id')
    product_id: string,
  ): Promise<Product> {
    return this.productService.deleteProduct({ company_id, product_id });
  }
}
