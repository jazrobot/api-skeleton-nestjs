import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './modules/env/env.service';
import { ZodExceptionFilter } from './common/filters/zodException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnvService);
  const port = configService.get('PORT');
  app.useGlobalFilters(new ZodExceptionFilter());
  await app.listen(port);
}
bootstrap();
