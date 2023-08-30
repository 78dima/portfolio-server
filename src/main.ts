import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const start = async () => {
  try {
    const PORT = process.env.PORT || 8000;
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: ['https://www.78dima.com', 'https://www.api.78dima.com'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders:
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
      credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe());
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'https://www.78dima.com');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,PUT,PATCH,POST,DELETE',
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );
      next();
    });

    await app.listen(PORT, () => console.log('Server starts on ', PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
