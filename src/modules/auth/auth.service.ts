import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AppError } from '../../common/constants/errors';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcryptjs';
import { AuthUserResponse } from './response/auth-user-response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly tokenService: TokenService) {}

    async registerUser(dto: CreateUserDto): Promise<CreateUserDto> {
        try {
            const existUser = await this.usersService.findUserByEmail(dto.email);

            if (existUser) {
                throw new BadRequestException(AppError.USER_EXIST);
            }

            return this.usersService.create(dto);
        } catch (e) {
            throw new Error(e);
        }
    }

    async loginUser(dto: UserLoginDto): Promise<AuthUserResponse> {
        try {
            const existUser = await this.usersService.findUserByEmail(dto.email);

            if (!existUser) {
                throw new BadRequestException(AppError.USER_NOT_EXIST);
            }

            const validatePassword = await bcrypt.compare(dto.password, existUser.password);

            if (!validatePassword) {
                throw new BadRequestException(AppError.WRONG_DATA);
            }

            const user = await this.usersService.publicUser(dto.email);

            const token = await this.tokenService.generateJwtToken(user);

            return { user, token };
        } catch (e) {
            throw new Error(e);
        }
    }
}
