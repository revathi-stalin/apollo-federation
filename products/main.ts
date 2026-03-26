import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
  console.log(`Products service is running on http://localhost:3001`);
}

bootstrap().catch((err) => {
  console.error('Error starting products service:', err);
  process.exit(1);
});
