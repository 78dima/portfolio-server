import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const start = async () => {
  try {
    const PORT = process.env.PORT || 8000;
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: [
        'https://78dima.com',
        'https://www.78dima.com',
        'http://localhost:3000',
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log('Server starts on ', PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
