import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AccessToken } from './interfaces/auth.interface';
import { RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('User not found');

    const isMatch: boolean = bcrypt.compareSync(
      password,
      String(user.password),
    );
    if (!isMatch) throw new BadRequestException('Invalid password');

    return user;
  }

  async login(user: User): Promise<AccessToken> {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: RegisterDto): Promise<AccessToken> {
    // -- Check if the user already exists --
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
    if (existingUser) throw new BadRequestException('Email already exists');
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    // -- Create a new user --
    const newUser = await this.prisma.user.create({
      data: { ...user, password: hashedPassword },
    });
    // Return the access token
    return this.login(newUser);
  }
}
