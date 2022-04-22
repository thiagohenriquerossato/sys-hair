import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginBodyDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'fulano@example.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Senha do usuário',
    example: '12345',
  })
  password: string;
}
