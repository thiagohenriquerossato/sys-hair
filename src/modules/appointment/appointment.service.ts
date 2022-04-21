import { PrismaService } from './../../prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Appointment, AppontmentStatus, Prisma } from '@prisma/client';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async appointment(
    appointmentWhereUniqueInput: Prisma.AppointmentWhereUniqueInput,
  ): Promise<Appointment> {
    return this.prisma.appointment.findUnique({
      where: appointmentWhereUniqueInput,
    });
  }

  async appointments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AppointmentWhereUniqueInput;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput;
  }): Promise<Appointment[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.appointment
      .findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }

  async createAppointment(params: {
    product_id: string[];
    client_id: string;
    company_id: string;
    date: Date;
    amount: number;
    responsible: string;
  }): Promise<Appointment> {
    const { product_id, client_id, company_id, date, amount, responsible } =
      params;

    const client = await this.prisma.client.findUnique({
      where: {
        id: client_id,
      },
    });
    if (!client) {
      throw new HttpException(
        'Client does not existis!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const company = await this.prisma.company.findUnique({
      where: {
        id: company_id,
      },
    });
    if (!company) {
      throw new HttpException(
        'Company does not existis!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const appointment = await this.prisma.appointment.create({
      data: {
        date,
        amount,
        responsible,
        company_id,
        appointmentsClients: {
          create: {
            client_id,
          },
        },
      },
    });
    for (let i = 0; i < product_id.length; i++) {
      await this.prisma.appointment.update({
        where: {
          id: appointment.id,
        },
        data: {
          appointmentProducts: {
            create: {
              product_id: product_id[i],
            },
          },
        },
      });
    }

    return appointment;
  }

  async updateAppointment(params: {
    where: Prisma.AppointmentWhereUniqueInput;
    data: { status: AppontmentStatus };
  }): Promise<Appointment> {
    const { where, data } = params;
    const { status } = data;

    const appointment = await this.prisma.appointment.findUnique({ where });
    if (!appointment) {
    }
    return this.prisma.appointment.update({
      where,
      data: {
        status,
      },
    });
  }
}
