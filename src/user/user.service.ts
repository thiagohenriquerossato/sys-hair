import { CreateUserDto } from './dto/createUserDto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { encodePass } from '../utils/bcrypt';

type UserResponse = {
  id: string;
  name: string;
  email: string;
};

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserResponse[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async createUser(data: CreateUserDto): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (user) {
      throw new HttpException('User already existis!', HttpStatus.BAD_REQUEST);
    }
    const company = await this.prisma.company.findUnique({
      where: {
        id: data.company_id,
      },
    });
    if (!company) {
      throw new HttpException(
        'Company does not existis!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const password = await encodePass(data.password);
    const result = await this.prisma.user.create({
      data: { ...data, password },
    });

    return { id: result.id, name: result.name, email: result.email };
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: params.where,
    });
    if (!user) {
      throw new HttpException('User does not existis!', HttpStatus.BAD_REQUEST);
    }

    const { where, data } = params;
    let password;
    if (data.password) {
      password = await encodePass(data.password as string);
    }
    return this.prisma.user.update({
      data: { ...data, password },
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where,
    });
    if (!user) {
      throw new HttpException('User does not existis!', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.user.delete({
      where,
    });
  }
}
