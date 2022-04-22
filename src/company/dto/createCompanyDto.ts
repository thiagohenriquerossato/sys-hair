import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Nome do salão.',
    example: 'Sicrano de Tal',
  })
  name: string;

  @ApiProperty({
    description:
      'Email do salão - Não é permitido mais de um salão com mesmo email.',
    example: 'sicrano@exemple.com',
  })
  email: string;

  @ApiProperty({
    description:
      'CNPJ do salão - Não é permitido mais de um salão com mesmo CPF. Apenas números.',
    example: '00000000/0000-00',
  })
  cnpj: string;

  @ApiProperty({
    description: 'Telefone do salão. Criar máscara.',
    example: '(84) 9 9999-9999',
  })
  phone: string;

  @ApiProperty({
    description: 'Endereço.',
    example: 'Rua dos Bobos.',
  })
  logradouro: string;

  @ApiProperty({
    description: 'Número da residencia.',
    example: 'zero',
  })
  numero: string;

  @ApiProperty({
    description: 'Bairro.',
    example: 'Infinitude',
  })
  bairro: string;

  @ApiProperty({
    description: 'CEP - Criar máscara.',
    example: '00000-000',
  })
  cep: string;

  @ApiProperty({
    description: 'Cidade - será feito upcase.',
    example: 'Bobonópolis',
  })
  city: string;

  @ApiProperty({
    description: 'Estado - será feito upcase.',
    example: 'Rio de Dezembro',
  })
  state: string;
}
