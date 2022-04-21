import { AppointmentService } from './appointment.service';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Appointment, Prisma } from '@prisma/client';

@Controller()
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('appointment')
  async createAppointment(
    @Body()
    params: {
      product_id: string[];
      client_id: string;
      company_id: string;
      date: Date;
      amount: number;
      responsible: string;
    },
  ): Promise<Appointment> {
    return this.appointmentService.createAppointment(params);
  }

  @Get('appointments')
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
