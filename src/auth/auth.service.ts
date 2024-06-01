import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { AccessToken } from './types/AccessToken';
import { UsersService } from 'src/users/users.service';
import { RegisterRequestDto } from './dtos/register-request.dto';
import {
  ResenCodeRequestDto,
  VerifyRequestDto,
} from './dtos/verify-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    const isVerified = await this.usersService.isVerifiedUser(user.id);
    if (!isVerified) {
      throw new BadRequestException('Your acccount is not active!');
    }
    return user;
  }

  async login(user: User): Promise<AccessToken> {
    const userInfo = await this.validateUser(user.email, user.password);

    const payload = { email: userInfo.email, id: userInfo.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: RegisterRequestDto): Promise<User> {
    // await this.usersService.finds();
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const verifyCode = Math.floor(1000 + Math.random() * 9000);
    const newUser: User = {
      ...user,
      password: hashedPassword,
      verify_code: String(verifyCode),
    };
    const isCreated = await this.usersService.create(newUser);

    const response = this.usersService.findOneById(isCreated.id);
    return response;
    // return this.login(newUser);
  }

  async verifyUser(req: VerifyRequestDto): Promise<boolean> {
    const isExist = await this.usersService.findOneByEmailBase(req.email);
    if (!isExist) {
      throw new BadRequestException('Please try again!');
    }
    const isOk = await this.usersService.verifyUser(req.email, req.verify_code);

    if (isOk) {
      await this.usersService.userApprove(req.email);
      return true;
    }
    return false;
  }

  async resendCode(req: ResenCodeRequestDto): Promise<string> {
    const isExist = await this.usersService.findOneByEmailBase(req.email);
    if (!isExist) {
      throw new BadRequestException('Please try again!');
    }

    const verifyCode = Math.floor(1000 + Math.random() * 9000);

    const isCreated = await this.usersService.generateNewOtp(
      isExist.id,
      String(verifyCode),
    );
    if (isCreated) {
      return String(verifyCode);
    }
    return '';
  }
}
