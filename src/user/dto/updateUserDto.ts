import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'So será permitido alteração de senha',
    example: '12345',
  })
  password: string;
}
