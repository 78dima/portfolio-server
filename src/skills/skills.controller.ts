import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillsDto } from './dto/create-skills.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/common/decorators/public.decorator';
import { AtGuard } from 'src/common/guards/at.guard';

@Controller('api/skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @UseGuards(AtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() skillDto: CreateSkillsDto, @UploadedFile() image) {
    return this.skillsService.createSkill(skillDto, image);
  }

  @Public()
  @Get()
  getAll() {
    return this.skillsService.getAllSkills();
  }

  @Public()
  @Get()
  findOne(@Param('id') id: string) {
    return this.skillsService.getOneSkill(id);
  }
}
