import { Hears, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { TelegramBotService } from './telegram-bot.service';
import { Public } from 'src/common/decorators/public.decorator';

@Update()
export class TelegramBotUpdate {
  constructor(private telegramBotService: TelegramBotService) {}

  @Public()
  @Start()
  startCommand(ctx: Context) {
    return this.telegramBotService.startCommand(ctx);
  }

  @Public()
  @Hears('✉️ Show all messages')
  getAllMessages(ctx: Context) {
    return this.telegramBotService.getAllMessages(ctx);
  }
}
