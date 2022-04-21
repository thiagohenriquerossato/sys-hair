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

type ProductData = {
  type: string;
  price: number;
};

type ProductDataUpdate = {
  type?: string;
  price?: number;
};
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('product/:company_id')
  async createProduct(
    @Param('company_id') company_id: string,
    @Body()
    data: ProductData,
  ): Promise<Product> {
    return this.productService.createProduct(data, company_id);
  }

  @Get('products')
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
    data: ProductDataUpdate,
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
