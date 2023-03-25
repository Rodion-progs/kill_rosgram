import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import * as bcrypt from 'bcryptjs';
import { Like } from '../likes/likes.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModel) private readonly userRepository: typeof UserModel) {}

    async hashPassword(password: string): Promise<string> {
        try {
            return bcrypt.hash(password, 10);
        } catch (e) {
            throw new Error(e);
        }
    }

    findUserByEmail(email: string): Promise<UserModel> {
        try {
            return this.userRepository.findOne({ where: { email } });
        } catch (e) {
            throw new Error(e);
        }
    }

    async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
        try {
            createUserDto.password = await this.hashPassword(createUserDto.password);
            await this.userRepository.create({
                email: createUserDto.email,
                password: createUserDto.password,
            });
            return createUserDto;
        } catch (e) {
            throw new Error(e);
        }
    }

    async publicUser(email: string): Promise<UserModel> {
        try {
            return await this.userRepository.findOne({
                where: { email },
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: Like,
                        required: false,
                    },
                ],
            });
        } catch (e) {
            throw new Error(e);
        }
    }
}
