import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from './../prisma.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserController } from 'src/modules/user/user.controller';
import { UserService } from 'src/modules/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    PrismaService,
    JwtStrategy,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
