import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Fulano de Tal',
  })
  name: string;

  @ApiProperty({
    description:
      'Email do usuário que será utilizado para o login. Não é permitido mais de um usuário com mesmo email.',
    example: 'fulano@exemplo.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '1234',
  })
  password: string;

  @ApiProperty({
    description: 'Id do salão do usuário',
    example: 'uuid',
  })
  company_id?: string;
}
