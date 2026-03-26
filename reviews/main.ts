import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);
  console.log(`Reviews service is running on http://localhost:3002`);
}

bootstrap().catch((err) => {
  console.error('Error starting reviews service:', err);
  process.exit(1);
});
