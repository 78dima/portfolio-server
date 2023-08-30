import { Module } from '@nestjs/common';
import { MyWorkController } from './my-work.controller';
import { MyWorkService } from './my-work.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MyWork } from './my-work.model';

@Module({
  controllers: [MyWorkController],
  providers: [MyWorkService],
  imports: [SequelizeModule.forFeature([MyWork])],
})
export class MyWorkModule {}
