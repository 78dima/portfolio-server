import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { About } from './about.model';
import { CreateAboutDto } from './dto/create-about.dto';

@Injectable()
export class AboutService {
  constructor(@InjectModel(About) private aboutRepository: typeof About) {}

  async getData() {
    return await this.aboutRepository.findAll();
  }

  async findOne(id: string) {
    return await this.aboutRepository.findByPk(id);
  }

  async createAbout(dto: CreateAboutDto) {
    return await this.aboutRepository.create(dto);
  }

  async updateAbout(id: string, data: CreateAboutDto) {
    return await this.aboutRepository.update(data, { where: { id } });
  }
}
