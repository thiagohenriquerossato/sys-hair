import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

type UserResponse = {
  id: string;
  name: string;
  email: string;
};
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';

@ApiTags('users')
@ApiBearerAuth('token')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async signUpUser(
    @Body() userData: CreateUserDto,
  ): Promise<UserResponse | Response> {
    return this.userService.createUser(userData);
  }

  @Get('users')
  async getUsers(): Promise<UserResponse[]> {
    return this.userService.users({
      orderBy: { name: 'asc' },
    });
  }

  @Put('user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    userUpdateData: UpdateUserDto,
  ): Promise<UserResponse> {
    const result = await this.userService.updateUser({
      where: { id: id },
      data: userUpdateData,
    });
    const userResponse = {
      id: result.id,
      name: result.name,
      email: result.email,
    };
    return userResponse;
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser({ id });
  }
}
