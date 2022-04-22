import { LoginBodyDto } from './dto/loginBodyDto';
import { AuthService } from './auth.service';
import {
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest, @Body() loginBody: LoginBodyDto) {
    return this.authService.login(req.user);
  }
}
