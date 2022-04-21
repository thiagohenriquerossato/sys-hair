import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AppointmentController } from './modules/appointment/appointment.controller';
import { AppointmentService } from './modules/appointment/appointment.service';
import { ProductController } from './modules/product/product.controller';
import { ProductService } from './modules/product/product.service';
import { ClientController } from './modules/client/client.controller';
import { ClientService } from './modules/client/client.service';
import { UserService } from './modules/user/user.service';
import { UserController } from './modules/user/user.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from './core/allExceptionsFilter';
import { CompanyController } from './modules/company/company.controller';
import { CompanyService } from './modules/company/company.service';
import { StateController } from './modules/state/state.controller';
import { StateService } from './modules/state/state.service';
import { CityService } from './modules/city/city.service';
import { CityController } from './modules/city/city.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [
    UserController,
    ClientController,
    CompanyController,
    ProductController,
    AppointmentController,
    StateController,
    CityController,
  ],
  providers: [
    PrismaService,
    UserService,
    ClientService,
    CompanyService,
    ProductService,
    AppointmentService,
    StateService,
    CityService,
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
