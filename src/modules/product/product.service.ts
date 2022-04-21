import { PrismaService } from './../../prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

type ProductData = {
  type: string;
  price: number;
};

type ProductDataUpdate = {
  type?: string;
  price?: number;
};

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async product(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput,
  ): Promise<Product> {
    return this.prisma.product.findUnique({
      where: productWhereUniqueInput,
    });
  }

  async products(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async createProduct(data: ProductData, company_id: string): Promise<Product> {
    const { price, type } = data;
    const company = await this.prisma.company.findUnique({
      where: { id: company_id },
    });

    if (!company) {
      throw new HttpException(
        'Company does not existis!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.product.create({
      data: {
        price,
        type,
        company_id,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: ProductDataUpdate;
  }): Promise<Product> {
    const { where, data } = params;
    const product = await this.prisma.product.findUnique({ where });
    if (!product) {
      throw new HttpException(
        'Product does not existis!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.product.update({
      where,
      data,
    });
  }

  async deleteProduct(params: {
    company_id: string;
    product_id: string;
  }): Promise<Product> {
    const { company_id, product_id } = params;
    const company = await this.prisma.company.findUnique({
      where: {
        id: company_id,
      },
    });
    if (!company) {
      throw new HttpException(
        'Company does not existis!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const product = await this.prisma.product.findUnique({
      where: {
        id: product_id,
      },
    });
    if (!product) {
      throw new HttpException(
        'Product does not existis!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.product.delete({
      where: {
        id: product_id,
      },
    });
  }
}
