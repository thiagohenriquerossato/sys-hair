import { AppointmentService } from './appointment.service';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Appointment, Prisma } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreateAppointmentDto } from './dto/createAppointmentDto';

@ApiTags('appointments')
@ApiBearerAuth('token')
@Controller()
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('appointment')
  async createAppointment(
    @Body()
    params: CreateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentService.createAppointment(params);
  }

  @Get('appointments')
  @ApiQuery({
    name: 'status',
    description: 'Opcional',
    required: false,
    explode: false,
    type: String,
    example: 'Aberto',
    enum: ['Aberto', 'Cancelado', 'Fechado'],
  })
  async listAppointments(
    @Query() status: Prisma.AppointmentWhereInput,
  ): Promise<Appointment[]> {
    return this.appointmentService.appointments({
      where: status,
      orderBy: {
        created_at: 'asc',
      },
    });
  }
  @Put('appointment/cancel/:id')
  async setCanceledAppointment(@Param('id') id: string): Promise<Appointment> {
    return this.appointmentService.updateAppointment({
      where: { id },
      data: { status: 'Cancelado' },
    });
  }

  @Put('appointment/close/:id')
  async setClosedAppointment(@Param('id') id: string): Promise<Appointment> {
    return this.appointmentService.updateAppointment({
      where: { id },
      data: { status: 'Fechado' },
    });
  }
}
