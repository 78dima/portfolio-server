import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { AboutModule } from './about/about.module';
import { About } from './about/about.model';
import { SkillsModule } from './skills/skills.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards/at.guard';
import { MyWorkModule } from './my-work/my-work.module';
import { ContactMeModule } from './contact-me/contact-me.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: process.env.TELEGRAM_TOKEN,
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MulterModule.register({ dest: './static' }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, About],
      autoLoadModels: true,
      define: {
        timestamps: false,
      },
    }),
    UsersModule,
    AboutModule,
    SkillsModule,
    AuthModule,
    MyWorkModule,
    ContactMeModule,
    TelegramBotModule,
  ],
})
export class AppModule {}
