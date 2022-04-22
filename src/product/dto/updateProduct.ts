import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Nome do serviço',
    example: 'Corte de cabelos simples',
    required: false,
  })
  type?: string;

  @ApiProperty({
    description: 'Valor do serviço - sem ponto flutuante: R$ 25,00 => 2500',
    example: 2500,
    required: false,
  })
  price?: number;
}
