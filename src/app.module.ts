import { AppointmentModule } from './appointment/appointment.module';
import { CityModule } from './city/city.module';
import { ClientModule } from './client/client.module';
import { ProductModule } from './product/product.module';
import { StateModule } from './state/state.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './core/allExceptionsFilter';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    CompanyModule,
    StateModule,
    ProductModule,
    ClientModule,
    CityModule,
    AppointmentModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
