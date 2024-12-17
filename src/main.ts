import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Automatically transform payloads to DTO instances
    forbidNonWhitelisted: true, // Reject objects with non-whitelisted properties
    whitelist: true, // Strip properties that do not have decorators
  }));

  // CORS configuration to allow connections from the frontend
  app.enableCors({
    origin: 'http://localhost:3001', // Allow the frontend running on localhost:3001
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true, // Allow credentials if needed
  });

  // Start the app on port 3000
  await app.listen(3000);
}

bootstrap();
