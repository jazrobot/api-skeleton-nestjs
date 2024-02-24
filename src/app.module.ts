import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvModule } from './modules/env/env.module';
import { envSchema } from './modules/env/env.schema';

import { AuthModule } from './modules/auth/auth.module';
import { JwtGuard } from './modules/auth/guards/jwt.guard';
import { JwtStrategy } from './modules/auth/strategy/jwt.strategy';

import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
      envFilePath: ['.env.local', '.env.development', '.env'],
    }),
    EnvModule,
    AuthModule,
    TaskModule,
  ],
  controllers: [],
  providers: [{ provide: 'APP_GUARD', useClass: JwtGuard }, JwtStrategy],
})
export class AppModule {}
