import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const tokens = await this.generateToken(user);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return { ...tokens, user: user.email };
  }

  async registration(userDto: CreateUserDto) {
    // const candidate = await this.userService.getUsersByEmail(userDto.email);
    // if (candidate) {
    //   throw new HttpException(
    //     'User with that email is exist',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    const tokens = await this.generateToken(user);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUsersByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    } else {
      throw new ForbiddenException('Access denied');
    }
  }

  private async generateToken(user: User) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        {
          secret: process.env.PRIVATE_KEY_AT,
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        },
        {
          secret: process.env.PRIVATE_KEY_RT,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  private async updateRtHash(id: number, rt: string) {
    const hash = await bcrypt.hash(rt, 5);
    await this.userService.updateUser(id, hash);
  }

  async refreshTokens(id: number, rt: string) {
    const user = await this.userService.getOneUser(id);
    if (!user || !user.hashedRt) {
      throw new ForbiddenException('Access denied');
    }
    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches) {
      throw new ForbiddenException('Access denied');
    }
    const tokens = await this.generateToken(user);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
}
