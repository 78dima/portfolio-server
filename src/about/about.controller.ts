import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { AtGuard } from 'src/common/guards/at.guard';

@Controller('api/about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Public()
  @Get()
  getAll() {
    return this.aboutService.getData();
  }

  @UseGuards(AtGuard)
  @Post()
  createAbout(@Body() aboutDto: CreateAboutDto) {
    return this.aboutService.createAbout(aboutDto);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutService.findOne(id);
  }

  @UseGuards(AtGuard)
  @Put(':id')
  updateAbout(@Param('id') id: string, @Body() aboutDto: CreateAboutDto) {
    return this.aboutService.updateAbout(id, aboutDto);
  }
}
