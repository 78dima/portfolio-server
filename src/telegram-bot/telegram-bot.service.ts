import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { actionButtons } from './telegram-bot.buttons';
import { ContactMeService } from 'src/contact-me/contact-me.service';

@Injectable()
export class TelegramBotService {
  constructor(
    @Inject(forwardRef(() => ContactMeService))
    private contactMeService: ContactMeService,
    @InjectBot() private bot: Telegraf<Context>,
  ) {}

  async startCommand(ctx: Context) {
    await ctx.reply('Hello, welcome to bot', actionButtons());
  }

  async getAllMessages(ctx: Context) {
    const data = await this.contactMeService.findAllMessages();
    const normalizedData = data.map((item, id) => {
      return `${id++} - Name - ${item.name}, email - ${item.email}, subject - ${
        item.subject
      }, message - ${item.message}\n`;
    });
    await ctx.reply(String(normalizedData));
  }

  async sendMessage() {
    return await this.bot.telegram.sendMessage(
      '-998935998',
      'You have new message from web-site',
    );
  }
}
