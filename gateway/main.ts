import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
  console.log('Gateway running on http://localhost:4000/graphql');
}

bootstrap().catch((err) => {
  console.error('Error starting gateway:', err);
  process.exit(1);
});
