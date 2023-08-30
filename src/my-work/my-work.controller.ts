import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MyWorkService } from './my-work.service';
import { CreateMyWorkDto } from './dto/create-my-work.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { AtGuard } from 'src/common/guards/at.guard';

@Controller('api/my-work')
export class MyWorkController {
  constructor(private myWorkService: MyWorkService) {}

  @UseGuards(AtGuard)
  @Post()
  create(@Body() myWorkDto: CreateMyWorkDto) {
    return this.myWorkService.createMyWork(myWorkDto);
  }

  @Public()
  @Get()
  getAll() {
    return this.myWorkService.getAllMyWorks();
  }

  @Public()
  @Get()
  findOne(@Param('id') id: string) {
    return this.myWorkService.getOneMyWork(id);
  }
}
