import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MyWork } from './my-work.model';
import { CreateMyWorkDto } from './dto/create-my-work.dto';

@Injectable()
export class MyWorkService {
  constructor(@InjectModel(MyWork) private myWorkRepository: typeof MyWork) {}

  async createMyWork(dto: CreateMyWorkDto) {
    return await this.myWorkRepository.create(dto);
  }

  async getAllMyWorks() {
    return await this.myWorkRepository.findAll();
  }

  async getOneMyWork(id) {
    return await this.myWorkRepository.findByPk(id);
  }
}
