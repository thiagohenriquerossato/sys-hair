import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto {
  @ApiProperty({
    description: 'Nome de cliente.',
    example: 'Sicrano de Tal',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description:
      'Email do cliente - Não é permitido mais de um cliente com mesmo email.',
    example: 'sicrano@exemple.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description:
      'CPF do cliente - Não é permitido mais de um cliente com mesmo CPF. Apenas números.',
    example: '00000000000',
    required: false,
  })
  cpf?: string;

  @ApiProperty({
    description: 'Telefone do Cliente. Criar máscara.',
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
