import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Skills } from './skills.model';
import { CreateSkillsDto } from './dto/create-skills.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skills) private skillsRepository: typeof Skills,
    private fileService: FilesService,
  ) {}

  async createSkill(dto: CreateSkillsDto, image) {
    const fileName = await this.fileService.createFile(image);
    return await this.skillsRepository.create({ ...dto, image: fileName });
  }

  async getAllSkills() {
    return await this.skillsRepository.findAll();
  }

  async getOneSkill(id) {
    return await this.skillsRepository.findByPk(id);
  }
}
