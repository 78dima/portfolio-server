import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RtGuard } from 'src/common/guards/rt.guard';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { AtGuard } from 'src/common/guards/at.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() userDto: CreateUserDto) {
    const userData = await this.authService.login(userDto);
    return userData;
  }

  @UseGuards(AtGuard)
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Get('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
