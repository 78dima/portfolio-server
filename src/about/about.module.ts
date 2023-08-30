import { Module } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutController } from './about.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { About } from './about.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [AboutService],
  controllers: [AboutController],
  imports: [SequelizeModule.forFeature([About]), AuthModule],
})
export class AboutModule {}
