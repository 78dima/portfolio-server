import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactMeService } from './contact-me.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateContactmeDto } from './contracts/create-contact-me.dto';

@Controller('api/contact-me')
export class ContactMeController {
  constructor(private contactMeService: ContactMeService) {}

  @Public()
  @Post()
  create(@Body() dto: CreateContactmeDto) {
    return this.contactMeService.createMessage(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.contactMeService.findAllMessages();
  }
}
