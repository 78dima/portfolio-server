import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getOneUser(id) {
    return await this.userRepository.findByPk(id);
  }

  async getUsersByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    if (user) {
      return user;
    }
    throw new UnauthorizedException({ message: 'User cannot find' });
  }

  async updateUser(id: number, hashedRt: string) {
    return await this.userRepository.update(
      {
        hashedRt,
      },
      {
        where: { id },
      },
    );
  }
}
