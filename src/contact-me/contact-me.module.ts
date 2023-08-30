import { Module, forwardRef } from '@nestjs/common';
import { ContactMeController } from './contact-me.controller';
import { ContactMeService } from './contact-me.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContactMe } from './contact-me.model';
import { TelegramBotModule } from 'src/telegram-bot/telegram-bot.module';

@Module({
  controllers: [ContactMeController],
  providers: [ContactMeService],
  imports: [
    SequelizeModule.forFeature([ContactMe]),
    forwardRef(() => TelegramBotModule),
  ],
  exports: [ContactMeService],
})
export class ContactMeModule {}
