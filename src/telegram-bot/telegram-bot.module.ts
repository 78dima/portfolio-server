import { Module, forwardRef } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TelegramBotUpdate } from './telegram-bot.update';
import { ContactMeModule } from 'src/contact-me/contact-me.module';

@Module({
  providers: [TelegramBotService, TelegramBotUpdate],
  imports: [forwardRef(() => ContactMeModule)],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
