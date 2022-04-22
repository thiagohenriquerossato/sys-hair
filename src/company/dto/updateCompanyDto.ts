import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @ApiProperty({
    description: 'Nome do salão.',
    example: 'Sicrano de Tal',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description:
      'CNPJ do salão - Não é permitido mais de um salão com mesmo CPF. Apenas números.',
    example: '00000000/0000-00',
    required: false,
  })
  cnpj?: string;

  @ApiProperty({
    description: 'Telefone do salão. Criar máscara.',
    example: '(84) 9 9999-9999',
    required: false,
  })
  phone?: string;

  @ApiProperty({
    description: 'Endereço.',
    example: 'Rua dos Bobos.',
    required: false,
  })
  logradouro?: string;

  @ApiProperty({
    description: 'Número da residencia.',
    example: 'zero',
    required: false,
  })
  numero?: string;

  @ApiProperty({
    description: 'Bairro.',
    example: 'Infinitude',
    required: false,
  })
  bairro?: string;

  @ApiProperty({
    description: 'CEP - Criar máscara.',
    example: '00000-000',
    required: false,
  })
  cep?: string;

  @ApiProperty({
    description: 'Cidade - será feito upcase.',
    example: 'Bobonópolis',
    required: false,
  })
  city?: string;

  @ApiProperty({
    description: 'Estado - será feito upcase.',
    example: 'Rio de Dezembro',
    required: false,
  })
  state?: string;
}
