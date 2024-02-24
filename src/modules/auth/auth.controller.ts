import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/common/pipes/zodValidation.pipe';
import { Public } from './decorators/public.decorator';
import { Request as ExpressRequest } from 'express';
import { registerSchema, RegisterDto, loginSchema } from './dto/auth.dto';
import { User } from '@prisma/client';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body(new ZodValidationPipe(loginSchema)) _: User,
    @Request() req: ExpressRequest & { user: User },
  ) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async register(
    @Body(new ZodValidationPipe(registerSchema)) data: RegisterDto,
  ) {
    return this.authService.register(data);
  }
}
