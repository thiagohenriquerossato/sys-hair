import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nome do serviço',
    example: 'Corte de cabelos simples',
  })
  type: string;

  @ApiProperty({
    description: 'Valor do serviço - sem ponto flutuante: R$ 25,00 => 2500',
    example: 2500,
  })
  price: number;
}
