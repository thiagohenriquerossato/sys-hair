import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'Lista com o id dos serviços',
    example: '[uuid, uuid]',
  })
  product_id: string[];

  @ApiProperty({
    description: 'Id do cliente',
    example: 'uuid',
  })
  client_id: string;

  @ApiProperty({
    description: 'Id do salão',
    example: 'uuid',
  })
  company_id: string;

  @ApiProperty({
    description: 'Data do agendamento',
    example: '2022-04-25T16:00:00.000Z',
  })
  date: Date;

  @ApiProperty({
    description:
      'Soma dos valores dos serviços - Sem ponto flutuante - R$ 25,00 => 2500',
    example: 4500,
  })
  amount: number;

  @ApiProperty({
    description: 'Nome do responsável que executará o serviço.',
    example: 'Beltrano',
  })
  responsible: string;
}
