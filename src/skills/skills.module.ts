import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { Skills } from './skills.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [SkillsController],
  providers: [SkillsService],
  imports: [SequelizeModule.forFeature([Skills]), FilesModule],
})
export class SkillsModule {}
