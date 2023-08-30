import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContactMe } from './contact-me.model';
import { CreateContactmeDto } from './contracts/create-contact-me.dto';
import { TelegramBotService } from 'src/telegram-bot/telegram-bot.service';

@Injectable()
export class ContactMeService {
  constructor(
    @Inject(forwardRef(() => TelegramBotService))
    private telegramBotService: TelegramBotService,
    @InjectModel(ContactMe) private contactMeRepository: typeof ContactMe,
  ) {}

  async createMessage(dto: CreateContactmeDto) {
    try {
      await this.contactMeRepository.create(dto);
      await this.telegramBotService.sendMessage();
    } catch (e) {
      throw new BadRequestException(e);
    }
    return dto;
  }

  async findAllMessages() {
    return await this.contactMeRepository.findAll();
  }
}
